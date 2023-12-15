import { Isdd } from '@/app/sdlc/page';
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

// mutation for Sdd update

const UpdateSdd = gql`
	mutation UpdateSdd($updateSddId: String!, $input: UpdateSddInput!) {
		updateSdd(id: $updateSddId, input: $input) {
			id
			uml
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

interface Document {
	id: number;
	file: string;
	fileName: string;
}
interface SRSProps {
	onSave: (updatedInfo: Isdd) => void;
	sddPhaseInfo: Isdd;
}

const UpdateSDD: React.FC<SRSProps> = ({ onSave, sddPhaseInfo }) => {
	// use mutation for sdd
	const [updateSdd] = useMutation(UpdateSdd, { client });
	const [uploadFile] = useMutation(UploadImageTwo, { client: clientUpload });

	const [dataSaved, setDataSaved] = useState<boolean>(false);
	const [umls, setUmls] = useState<string[]>([]);
	const [documents, setDocuments] = useState<string[]>(
		Array.isArray(sddPhaseInfo.uml) ? sddPhaseInfo.uml : []
	);
	const [newDocumentId, setNewDocumentId] = useState<number>(1);
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	useEffect(() => {
		if (Array.isArray(sddPhaseInfo.uml)) {
			setDocuments(sddPhaseInfo.uml);
			setNewDocumentId(sddPhaseInfo.uml.length + 1);
		}
	}, [sddPhaseInfo.uml]);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// const reader = new FileReader();
			// reader.onloadend = () => {
			// 	const updatedDocuments = documents.map((doc) =>
			// 		doc.id === id ? { ...doc, file: reader.result as string } : doc
			// 	);
			// 	setDocuments(updatedDocuments);
			// };
			// reader.readAsDataURL(file);

			const { data } = await uploadFile({
				variables: {
					file: e.target.files?.[0],
				},
			});
			const { imageName } = data.uploadFile;
			setUmls([...umls, imageName]);
		}
	};

	const handleAddNewDocument = () => {
		setDocuments([...documents, '']);
		setNewDocumentId(newDocumentId + 1);
		setSuccessMessage('');
		setErrorMessage('');
	};

	const handleSave = async () => {
		if (documents.length === 0) {
			setErrorMessage('Please add new document');
			return;
		}

		const umlResult = [...documents, ...umls].filter((doc) => doc !== '');
		try {
			const { data } = await updateSdd({
				variables: {
					updateSddId: sddPhaseInfo.id,
					input: {
						uml: umlResult,
					},
				},
			});

			// 	const { data } = await createSdd({
			// 		variables: {
			// 			input: {
			// 				projectId,
			// 				uml: umls,
			// 			},
			// 		},
			// 	});
			console.log('data', data);

			// 	console.log('Saved SDD Information:', documents);
			//  onSave(documents);

			// console.log(data.updateSdd);
			console.log(umlResult);

			setSuccessMessage('SDD information saved successfully!');
			setDataSaved(true);
			setErrorMessage('');
		} catch (error) {
			console.log('Error saving SDD information:', error);
			setErrorMessage('Error saving SDD information.');
		}
	};

	const handleReset = () => {
		setDocuments(Array.isArray(sddPhaseInfo.uml) ? sddPhaseInfo.uml : []);
		setNewDocumentId(1);

		setSuccessMessage('');
		setErrorMessage('');
	};

	return (
		<ApolloProvider client={client}>
			<div>
				<div className={styles.phaseBody}>
					<div className="p-5 text-center bg-image">
						<div className={styles.container}>
							<h2>System Design Document (SDD)</h2>
							<h5 className={styles.prag}>
								Insert documents as Images <br />
								[UML Diagrams - Database Design - User Interface Design]
							</h5>
							{documents.map((doc, i) => (
								<div key={i}>
									<label htmlFor={`fileInput-${doc}`}>
										Browser Image
									</label>
									<input
										type="file"
										id={`fileInput-${doc}`}
										accept="*/*"
										onChange={(e) => handleFileChange(e)}
									/>
								</div>
							))}

							<a>
								{' '}
								<button onClick={handleAddNewDocument}>
									Add New Document
								</button>
							</a>

							{errorMessage && (
								<p style={{ color: 'red' }}>{errorMessage}</p>
							)}
							{successMessage && (
								<p style={{ color: 'green' }}>{successMessage}</p>
							)}
							<div style={{ marginTop: '40px' }}>
								<button onClick={handleSave}>Save</button>
								<button onClick={handleReset}>Reset</button>
							</div>
							{dataSaved && (
								<>
									<Link href="/sdlc">
										<button
											style={{
												color: 'red',
												backgroundColor: 'yellow',
											}}
										>
											View Phase
										</button>
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</ApolloProvider>
	);
};

export default UpdateSDD;
