import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useMutation } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './Styles.module.css';

export const client = new ApolloClient({
	link: createUploadLink({
		uri: 'http://localhost:3001/graphql',
		headers: { 'Apollo-Require-Preflight': 'true' },
	}),
	cache: new InMemoryCache(),
});

// graphql mutation for srs
const CreateSRS = gql`
	mutation CreateSrs($file: Upload, $input: CreateSrsInput!) {
		createSrs(file: $file, input: $input) {
			id
			intro
			purpose
			intended_audience
			description
			requirements
		}
	}
`;

const UploadImage = gql`
	mutation UploadImage($image: Upload!) {
		uploadImage(image: $image) {
			imageName
		}
	}
`;

interface ProjectInfo {
	introduction: string;
	purposeOfSoftwareBeingDeveloped: string;
	intendedAudience: string;
	overallDescriptionOfTheSoftware: string;
	systemFeaturesAndRequirements: string;
	browserImage: string;
}

interface SRSProps {
	onSave: (updatedInfo: ProjectInfo) => void;
	initialProjectInfoo: ProjectInfo;
	projectId: string;
}

const SRS: React.FC<SRSProps> = ({ onSave, initialProjectInfoo, projectId }) => {
	// graphql mutation
	const [createSRS] = useMutation(CreateSRS, { client });
	const [uploadImage] = useMutation(UploadImage, { client });

	// state for image upload file
	const [fileTwo, setFileTwo] = useState<File | null>(null);

	const [dataSaved, setDataSaved] = useState<boolean>(false);
	const [browserImage, setBrowserImage] = useState<string>('');

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBrowserImage(reader.result as string);
			};
			reader.readAsDataURL(file);
			setFileTwo(file);
			// console.log(file);
			console.log(fileTwo);

			const { data } = await uploadImage({
				variables: {
					image: e.target.files?.[0],
				},
			});
			console.log(data.uploadImage.imageName);
		}
	};

	const initialProjectInfo: ProjectInfo = initialProjectInfoo || {
		introduction: '',
		purposeOfSoftwareBeingDeveloped: '',
		intendedAudience: '',
		overallDescriptionOfTheSoftware: '',
		systemFeaturesAndRequirements: '',
		browserImage: '',
	};

	const [projectInfo, setProjectInfo] = useState<ProjectInfo>(initialProjectInfo);

	useEffect(() => {
		if (initialProjectInfoo) {
			setProjectInfo(initialProjectInfoo);
			setBrowserImage(initialProjectInfoo.browserImage);
		}
	}, [initialProjectInfoo]);

	const handleInputChange = (key: keyof ProjectInfo, value: string) => {
		setProjectInfo((prevInfo) => ({
			...prevInfo,
			[key]: value,
		}));
	};

	const handleReset = () => {
		setProjectInfo(initialProjectInfo);
		setProjectInfo((prevProjectInfo) => ({
			...prevProjectInfo,
			browserImage: '',
		}));
		setBrowserImage('' || initialProjectInfoo.browserImage);
		setSuccessMessage('');
		setErrorMessage('');
	};
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');
	const handleSave = async () => {
		projectInfo.browserImage = browserImage;
		setProjectInfo((prevProjectInfo) => ({
			...prevProjectInfo,
			browserImage,
		}));
		if (
			!projectInfo.browserImage ||
			!projectInfo.introduction ||
			!projectInfo.purposeOfSoftwareBeingDeveloped ||
			!projectInfo.intendedAudience ||
			!projectInfo.overallDescriptionOfTheSoftware ||
			!projectInfo.systemFeaturesAndRequirements
		) {
			setErrorMessage('Please complete all required fields.');
			return;
		}
		try {
			console.log('waiting for mutation');
			const { data } = await createSRS({
				variables: {
					input: {
						intro: projectInfo.introduction,
						purpose: projectInfo.purposeOfSoftwareBeingDeveloped,
						intended_audience: projectInfo.intendedAudience,
						description: projectInfo.overallDescriptionOfTheSoftware,
						requirements: projectInfo.systemFeaturesAndRequirements,
						projectId: projectId,
					},
					// file: fileTwo,
				},
			});

			console.log(data);

			onSave(projectInfo);
			setSuccessMessage('saved successfully!');
			setErrorMessage('');
			setDataSaved(true);
		} catch (error: any) {
			setErrorMessage(error.message);
			console.log(error);
			setSuccessMessage('');
		}
	};

	return (
		<ApolloProvider client={client}>
			<div>
				<div className={styles.phaseBody}>
					<div className="p-5 text-center bg-image">
						<div className={styles.container}>
							<h2>Requirements Phase (SRS)</h2>
							<label>
								Introduction
								<textarea
									value={projectInfo.introduction}
									onChange={(e) =>
										handleInputChange('introduction', e.target.value)
									}
								/>
							</label>
							<label>
								Purpose Of Software Being Developed
								<textarea
									value={projectInfo.purposeOfSoftwareBeingDeveloped}
									onChange={(e) =>
										handleInputChange(
											'purposeOfSoftwareBeingDeveloped',
											e.target.value
										)
									}
								/>
							</label>
							<label>
								Intended Audience
								<textarea
									value={projectInfo.intendedAudience}
									onChange={(e) =>
										handleInputChange(
											'intendedAudience',
											e.target.value
										)
									}
								/>
							</label>
							<label>
								Overall Description Of The Software
								<textarea
									value={projectInfo.overallDescriptionOfTheSoftware}
									onChange={(e) =>
										handleInputChange(
											'overallDescriptionOfTheSoftware',
											e.target.value
										)
									}
								/>
							</label>
							<label>
								System Features and Requirements:
								<br />
								[1] Functional Requirement
								<br />
								[2] Non-functional Requirement
								<br />
								[3] External Interface Requirement
								<br />
								<textarea
									value={projectInfo.systemFeaturesAndRequirements}
									onChange={(e) =>
										handleInputChange(
											'systemFeaturesAndRequirements',
											e.target.value
										)
									}
								/>
							</label>
							<div>
								<label htmlFor="fileInput">UseCase</label>
								<input
									type="file"
									id="fileInput"
									accept="image/*"
									onChange={handleFileChange}
								/>
							</div>
							{browserImage && (
								<div>
									<img
										src={browserImage}
										alt="Browser"
										style={{ maxWidth: '100%' }}
									/>
								</div>
							)}
							<div style={{ marginTop: '40px' }}>
								{errorMessage && (
									<p style={{ color: 'red' }}>{errorMessage}</p>
								)}
								{successMessage && (
									<p style={{ color: 'green' }}>{successMessage}</p>
								)}
								<button onClick={handleSave}>Save</button>
								<button onClick={handleReset}>Reset</button>
							</div>
							{dataSaved && (
								<Link href="/sdlc">
									<button
										style={{
											color: 'red',
											backgroundColor: 'yellow',
										}}
									>
										view Phase
									</button>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</ApolloProvider>
	);
};

export default SRS;
