'use client';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useMutation } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SDD from './SDD';
import SRS from './SRS';
import styles from './Styles.module.css';

// graphql client
export const client = new ApolloClient({
	link: createUploadLink({
		uri: 'http://localhost:3001/graphql',
	}),
	cache: new InMemoryCache(),
});

// graphql mutation
const CreateProject = gql`
	mutation CreateProject($input: CreateProjectInput) {
		createProject(input: $input) {
			id
			title
			startIn
			endIn
			objectives
			project_manager
			budget
			scope
		}
	}
`;

interface ProjectInfo {
	id?: string;
	title: string;
	startDate: Date | null;
	finishDate: Date | null;
	objectives: string;
	projectManager: string;
	budget: string;
	scopeStatements: string;
}

const SRSProjectInfo = {
	introduction: '',
	purposeOfSoftwareBeingDeveloped: '',
	intendedAudience: '',
	overallDescriptionOfTheSoftware: '',
	systemFeaturesAndRequirements: '',
	browserImage: '',
};

interface InitiationProps {
	onSave: (updatedInfo: ProjectInfo) => void;
	initialProjectInfoo: ProjectInfo;
}
// object pass to srs it have project id
// export let projectData = {};

const Initiation: React.FC<InitiationProps> = ({ onSave, initialProjectInfoo }) => {
	// graph mutation
	const [createProject] = useMutation(CreateProject, { client });

	const [dataSaved, setDataSaved] = useState<boolean>(false);

	const [errorMessage, setErrorMessage] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [formLocked, setFormLocked] = useState(false);
	const inputStyle = formLocked ? { backgroundColor: '#f2f2f2', color: '#999999' } : {};

	const initialProjectInfo: ProjectInfo = initialProjectInfoo || {
		id: '',
		title: '',
		startDate: null,
		finishDate: null,
		objectives: '',
		projectManager: '',
		budget: '',
		scopeStatements: '',
	};

	const [projectInfo, setProjectInfo] = useState<ProjectInfo>(initialProjectInfo);

	useEffect(() => {
		if (initialProjectInfoo) {
			setProjectInfo(initialProjectInfoo);
		}
	}, [initialProjectInfoo]);

	const [startDate, setStartDate] = useState<Date | null>(
		projectInfo.startDate ? new Date(projectInfo.startDate) : null
	);

	const [finishDate, setFinishDate] = useState<Date | null>(
		projectInfo.finishDate ? new Date(projectInfo.finishDate) : null
	);

	const [startDateString, setStartDateString] = useState<string>(
		startDate ? startDate.toISOString().split('T')[0] : ''
	);

	const [finishDateString, setFinishDateString] = useState<string>(
		finishDate ? finishDate.toISOString().split('T')[0] : ''
	);

	const handleInputChange = (key: keyof ProjectInfo, value: string) => {
		if (key === 'startDate' || key === 'finishDate') {
			const dateValue = value ? new Date(value) : null;

			if (key === 'startDate') {
				setStartDate(dateValue);
				setStartDateString(value);
			} else {
				setFinishDate(dateValue);
				setFinishDateString(value);
			}
		}
		setProjectInfo((prevInfo) => ({
			...prevInfo,
			[key]: value,
		}));
	};

	const handleReset = () => {
		setProjectInfo(initialProjectInfo);
		setSuccessMessage('');
		setErrorMessage('');

		if (initialProjectInfoo.title === '') {
			setStartDateString('');
			setFinishDateString('');
		} else {
			setStartDateString(
				initialProjectInfoo?.startDate instanceof Date
					? initialProjectInfoo.startDate.toISOString().split('T')[0]
					: ''
			);
			setFinishDateString(
				initialProjectInfoo?.finishDate instanceof Date
					? initialProjectInfoo.finishDate.toISOString().split('T')[0]
					: ''
			);
		}
	};
	const handleSave = async () => {
		if (
			!projectInfo.title ||
			!projectInfo.startDate ||
			!projectInfo.finishDate ||
			!projectInfo.objectives ||
			!projectInfo.projectManager ||
			!projectInfo.budget ||
			!projectInfo.scopeStatements
		) {
			setErrorMessage('Please complete all required fields.');
			return;
		}

		try {
			const data = await createProject({
				variables: {
					input: {
						title: projectInfo.title,
						startIn: projectInfo.startDate,
						endIn: projectInfo.finishDate,
						objectives: projectInfo.objectives,
						project_manager: projectInfo.projectManager,
						budget: projectInfo.budget * 1,
						scope: projectInfo.scopeStatements,
					},
				},
			});
			console.log(data);
			projectInfo.id = data.data.createProject.id;
			setSuccessMessage('saved successfully!');
			setErrorMessage('');
			onSave(projectInfo);
			setDataSaved(true);
			setFormLocked(true);
		} catch (error) {
			setErrorMessage('Error saving project information.');
			console.error(error);
		}
	};

	return (
		<ApolloProvider client={client}>
			<div>
				<div className={styles.phaseBody}>
					<div className="p-5 text-center bg-image">
						<div className={styles.container}>
							<h2>Initiation Phase</h2>
							<label>
								Project Title
								<input
									type="text"
									value={projectInfo.title}
									onChange={(e) =>
										handleInputChange('title', e.target.value)
									}
									disabled={formLocked}
									style={inputStyle}
								/>
							</label>

							<label htmlFor="startDatePicker">
								Project Start Date
								<input
									type="date"
									id="startDatePicker"
									value={startDateString || ''}
									onChange={(e) =>
										handleInputChange('startDate', e.target.value)
									}
									disabled={formLocked}
									style={inputStyle}
								/>
							</label>

							<label htmlFor="finishDatePicker">
								Project Finish Date
								<input
									type="date"
									id="finishDatePicker"
									value={finishDateString || ''}
									onChange={(e) =>
										handleInputChange('finishDate', e.target.value)
									}
									disabled={formLocked}
									style={inputStyle}
								/>
							</label>
							<label>
								Project Objectives
								<textarea
									value={projectInfo.objectives}
									onChange={(e) =>
										handleInputChange('objectives', e.target.value)
									}
									disabled={formLocked}
									style={inputStyle}
								/>
							</label>
							<label>
								Project Manager
								<input
									type="text"
									value={projectInfo.projectManager}
									onChange={(e) =>
										handleInputChange(
											'projectManager',
											e.target.value
										)
									}
									disabled={formLocked}
									style={inputStyle}
								/>
							</label>
							<label>
								Budget Information
								<input
									type="text"
									value={projectInfo.budget}
									onChange={(e) =>
										handleInputChange('budget', e.target.value)
									}
									disabled={formLocked}
									style={inputStyle}
								/>
							</label>
							<label>
								Project Scope Statements
								<textarea
									value={projectInfo.scopeStatements}
									onChange={(e) =>
										handleInputChange(
											'scopeStatements',
											e.target.value
										)
									}
									disabled={formLocked}
									style={inputStyle}
								/>
							</label>
							<div>
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
				{dataSaved && projectInfo.id && (
					<div>
						<SRS
							onSave={() => {
								return;
							}}
							initialProjectInfoo={SRSProjectInfo}
							projectId={projectInfo.id}
						/>
						<SDD
							onSave={() => {
								return;
							}}
							initialProjectInfoo={[]}
							projectId={projectInfo.id}
						/>
					</div>
				)}
			</div>
		</ApolloProvider>
	);
};

export default Initiation;
