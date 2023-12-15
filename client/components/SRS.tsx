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

const clientUpload = new ApolloClient({
	link: createUploadLink({
		uri: 'http://localhost:4000/graphql',
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
			use_case
			requirements
		}
	}
`;

const UploadImageTwo = gql`
	mutation UploadFile($file: Upload!) {
		uploadFile(file: $file) {
			imageName
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
	projectId: string | any;
}

const SRS: React.FC<SRSProps> = ({ onSave, initialProjectInfoo, projectId }) => {
	// graphql mutation
	const [createSRS] = useMutation(CreateSRS, { client });
	const [uploadImage] = useMutation(UploadImage, { client });
	const [uploadFile] = useMutation(UploadImageTwo, { client: clientUpload });

	// state for image upload file
	const [fileTwo, setFileTwo] = useState<File | null>(null);

	const [dataSaved, setDataSaved] = useState<boolean>(false);
	const [browserImage, setBrowserImage] = useState<string>('');
	const [formLocked, setFormLocked] = useState(false);
	const inputStyle = formLocked ? { backgroundColor: '#f2f2f2', color: '#999999' } : {};

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
			const { data } = await uploadFile({
				variables: {
					file: e.target.files?.[0],
				},
			});
			setBrowserImage(data.uploadFile.imageName);
			console.log(data.uploadFile.imageName);
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
						use_case: projectInfo.browserImage,
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
			setFormLocked(true);
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
									disabled={formLocked}
									style={inputStyle}
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
									disabled={formLocked}
									style={inputStyle}
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
									disabled={formLocked}
									style={inputStyle}
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
									disabled={formLocked}
									style={inputStyle}
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
									disabled={formLocked}
									style={inputStyle}
								/>
							</label>
							<div>
								<label htmlFor="fileInput">UseCase</label>
								<input
									type="file"
									id="fileInput"
									accept="image/*"
									onChange={handleFileChange}
									disabled={formLocked}
									style={inputStyle}
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
								<button
									onClick={handleSave}
									disabled={formLocked}
									style={inputStyle}
								>
									Save
								</button>
								<button
									onClick={handleReset}
									disabled={formLocked}
									style={inputStyle}
								>
									Reset
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ApolloProvider>
	);
};

export default SRS;
