import { Isrs } from '@/app/sdlc/page';
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

const UploadImageTwo = gql`
	mutation UploadFile($file: Upload!) {
		uploadFile(file: $file) {
			imageName
		}
	}
`;

// update srs mutation
const UpdateSrs = gql`
	mutation UpdateSrs($updateSrsId: String!, $input: UpdateSrsInput!) {
		updateSrs(id: $updateSrsId, input: $input) {
			id
			intro
			purpose
			intended_audience
			description
			requirements
			use_case
		}
	}
`;

interface SRSProps {
	onSave: (updatedInfo: Isrs) => void;
	srsPhaseInfo: Isrs;
}

const UpdateSRS: React.FC<SRSProps> = ({ onSave, srsPhaseInfo }) => {
	// graphql mutation
	const [updateSrs] = useMutation(UpdateSrs, { client });

	const [uploadFile] = useMutation(UploadImageTwo, { client: clientUpload });

	// state for image upload file

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

	const srsInfo: Isrs = srsPhaseInfo || {
		id: '',
		intro: '',
		purpose: '',
		intended_audience: '',
		description: '',
		requirements: '',
		use_case: '',
	};

	const [projectInfo, setProjectInfo] = useState<Isrs>(srsInfo);

	useEffect(() => {
		if (srsInfo) {
			setProjectInfo(srsInfo);
			setBrowserImage(srsInfo.use_case || '');
		}
	}, [srsPhaseInfo]);

	const handleInputChange = (key: keyof Isrs, value: string) => {
		setProjectInfo((prevInfo) => ({
			...prevInfo,
			[key]: value,
		}));
	};

	const handleReset = () => {
		setProjectInfo(srsInfo);
		setProjectInfo((prevProjectInfo) => ({
			...prevProjectInfo,
			browserImage: '',
		}));
		setBrowserImage(srsInfo.use_case || '');
		setSuccessMessage('');
		setErrorMessage('');
	};
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');
	const handleSave = async () => {
		projectInfo.use_case = browserImage;
		setProjectInfo((prevProjectInfo) => ({
			...prevProjectInfo,
			browserImage,
		}));
		if (
			!projectInfo.use_case ||
			!projectInfo.intro ||
			!projectInfo.purpose ||
			!projectInfo.intended_audience ||
			!projectInfo.description ||
			!projectInfo.requirements
		) {
			setErrorMessage('Please complete all required fields.');
			return;
		}
		try {
			console.log('waiting for mutation');

			const { data } = await updateSrs({
				variables: {
					updateSrsId: projectInfo.id,
					input: {
						intro: projectInfo.intro,
						purpose: projectInfo.purpose,
						intended_audience: projectInfo.intended_audience,
						description: projectInfo.description,
						requirements: projectInfo.requirements,
						use_case: projectInfo.use_case,
					},
				},
			});

			console.log(data);
			// console.log(projectInfo);

			onSave(projectInfo);
			setSuccessMessage('saved successfully!');
			setErrorMessage('');
			setDataSaved(true);
		} catch (error: any) {
			setErrorMessage(error.message);
			console.log(error);
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
									value={projectInfo.intro}
									onChange={(e) =>
										handleInputChange('intro', e.target.value)
									}
								/>
							</label>
							<label>
								Purpose Of Software Being Developed
								<textarea
									value={projectInfo.purpose}
									onChange={(e) =>
										handleInputChange('purpose', e.target.value)
									}
								/>
							</label>
							<label>
								Intended Audience
								<textarea
									value={projectInfo.intended_audience}
									onChange={(e) =>
										handleInputChange(
											'intended_audience',
											e.target.value
										)
									}
								/>
							</label>
							<label>
								Overall Description Of The Software
								<textarea
									value={projectInfo.description}
									onChange={(e) =>
										handleInputChange('description', e.target.value)
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
									value={projectInfo.requirements}
									onChange={(e) =>
										handleInputChange('requirements', e.target.value)
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
										src={`http://localhost:3001/images/${browserImage}`}
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

export default UpdateSRS;
