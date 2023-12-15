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

// mutation for Sdd
const CreateSdd = gql`
	mutation CreateSdd($input: CreateSddInput!) {
		createSdd(input: $input) {
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

export interface Document {
	id: number;
	file: string;
	fileName: string;
}
interface SRSProps {
	onSave: (updatedInfo: Document[]) => void;
	initialProjectInfoo?: Document[] | undefined;
	projectId: string | any;
}

const SDD: React.FC<SRSProps> = ({ onSave, initialProjectInfoo, projectId }) => {
	// use mutation for sdd
	const [createSdd] = useMutation(CreateSdd, { client });
	const [uploadFile] = useMutation(UploadImageTwo, { client: clientUpload });

	const [dataSaved, setDataSaved] = useState<boolean>(false);
	const [umls, setUmls] = useState<string[]>([]);
	const [documents, setDocuments] = useState<Document[]>(
		Array.isArray(initialProjectInfoo) ? initialProjectInfoo : []
	);
	const [newDocumentId, setNewDocumentId] = useState<number>(1);
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [formLocked, setFormLocked] = useState(false);
	const inputStyle = formLocked ? { backgroundColor: '#f2f2f2', color: '#999999' } : {};

	useEffect(() => {
		if (Array.isArray(initialProjectInfoo)) {
			setDocuments(initialProjectInfoo);
			setNewDocumentId(initialProjectInfoo.length + 1);
		}
	}, [initialProjectInfoo]);

	const handleFileChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number
	) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const updatedDocuments = documents.map((doc) =>
					doc.id === id ? { ...doc, file: reader.result as string } : doc
				);
				setDocuments(updatedDocuments);
			};
			reader.readAsDataURL(file);

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
		const newDocument: Document = {
			id: newDocumentId,
			file: '',
			fileName: '',
		};
		setDocuments([...documents, newDocument]);
		setNewDocumentId(newDocumentId + 1);
		setSuccessMessage('');
		setErrorMessage('');
	};

	const handleSave = async () => {
		if (documents.length === 0) {
			setErrorMessage('Please add new document');
			return;
		}

		if (documents.some((doc) => !doc.file || !doc.fileName)) {
			setErrorMessage('Please provide both file and fileName for all documents.');
			return;
		}

		try {
			const { data } = await createSdd({
				variables: {
					input: {
						projectId,
						uml: umls,
					},
				},
			});
			console.log('data', data);

			console.log('Saved SDD Information:', documents);
			onSave(documents);
			setSuccessMessage('SDD information saved successfully!');
			setDataSaved(true);
			setErrorMessage('');
			setFormLocked(true);
		} catch (error) {
			console.log('Error saving SDD information:', error);
			setErrorMessage('Error saving SDD information.');
		}
	};

	const handleReset = () => {
		setDocuments(Array.isArray(initialProjectInfoo) ? initialProjectInfoo : []);
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
							<h2>System Design Document (SDD) {projectId}</h2>
							<h5 className={styles.prag}>
								Insert documents as Images <br />
								[UML Diagrams - Database Design - User Interface Design]
							</h5>
							{documents.map((doc) => (
								<div key={doc.id}>
									<label htmlFor={`fileNameInput-${doc.id}`}>
										File Name
									</label>
									<input
										type="text"
										id={`fileNameInput-${doc.id}`}
										value={doc.fileName}
										onChange={(e) =>
											setDocuments((prevDocuments) =>
												prevDocuments.map((prevDoc) =>
													prevDoc.id === doc.id
														? {
																...prevDoc,
																fileName: e.target.value,
														  }
														: prevDoc
												)
											)
										}
										disabled={formLocked}
										style={inputStyle}
									/>
									<label htmlFor={`fileInput-${doc.id}`}>
										Browser Image
									</label>
									<input
										type="file"
										id={`fileInput-${doc.id}`}
										accept="*/*"
										onChange={(e) => handleFileChange(e, doc.id)}
										disabled={formLocked}
										style={inputStyle}
									/>
									{doc.file && (
										<div>
											<p>File Preview</p>
											<img
												src={doc.file}
												alt={`Preview for ${doc.fileName}`}
												style={{ maxWidth: '100%' }}
											/>
										</div>
									)}
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

export default SDD;
