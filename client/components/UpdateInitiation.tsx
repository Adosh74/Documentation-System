'use client';

import { Iinitiation } from '@/app/sdlc/page';
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

// graphql mutation for update initiation

const UpdateProject = gql`
	mutation UpdateProject($updateProjectId: String!, $input: ProjectUpdateInput) {
		updateProject(id: $updateProjectId, input: $input) {
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

interface InitiationProps {
	onSave: (updatedInfo: Iinitiation) => void;
	initialProjectInfoo: Iinitiation;
}
// object pass to srs it have project id
// export let projectData = {};

const UpdateInitiation: React.FC<InitiationProps> = ({ onSave, initialProjectInfoo }) => {
	// graph mutation

	const [updateProject, { loading, error, data }] = useMutation(UpdateProject, {
		client,
	});

	const [dataSaved, setDataSaved] = useState<boolean>(false);

	const [errorMessage, setErrorMessage] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');

	const initialProjectInfo: Iinitiation = initialProjectInfoo || {
		id: '',
		title: '',
		startIn: '',
		endIn: '',
		objectives: '',
		project_manager: '',
		budget: '',
		scope: '',
	};

	const [projectInfo, setProjectInfo] = useState<Iinitiation>(initialProjectInfo);

	useEffect(() => {
		if (initialProjectInfoo) {
			setProjectInfo(initialProjectInfoo);
		}
	}, [initialProjectInfoo]);

	const [startDate, setStartDate] = useState<Date | null>(
		projectInfo.startIn ? new Date(projectInfo.startIn) : null
	);

	const [finishDate, setFinishDate] = useState<Date | null>(
		projectInfo.endIn ? new Date(projectInfo.endIn) : null
	);

	const [startDateString, setStartDateString] = useState<string>(
		startDate ? startDate.toISOString().split('T')[0] : ''
	);

	const [finishDateString, setFinishDateString] = useState<string>(
		finishDate ? finishDate.toISOString().split('T')[0] : ''
	);

	const handleInputChange = (key: keyof Iinitiation, value: string) => {
		if (key === 'startIn' || key === 'endIn') {
			const dateValue = value ? new Date(value) : null;

			if (key === 'startIn') {
				setStartDate(dateValue);
				setStartDateString(value);
			} else {
				setFinishDate(dateValue);
				setFinishDateString(value);
			}
		}
		setProjectInfo((prevInfo: any) => ({
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
				initialProjectInfoo?.startIn
					? new Date(initialProjectInfoo.startIn).toISOString().split('T')[0]
					: ''
			);
			setFinishDateString(
				initialProjectInfoo?.endIn
					? new Date(initialProjectInfoo.endIn).toISOString().split('T')[0]
					: ''
			);
		}
	};
	const handleSave = async () => {
		if (
			!projectInfo.title ||
			!projectInfo.startIn ||
			!projectInfo.endIn ||
			!projectInfo.objectives ||
			!projectInfo.project_manager ||
			!projectInfo.budget ||
			!projectInfo.scope
		) {
			setErrorMessage('Please complete all required fields.');
			return;
		}

		try {
			const { data } = await updateProject({
				variables: {
					updateProjectId: projectInfo.id,
					input: {
						id: projectInfo.id,
						title: projectInfo.title,
						startIn: new Date(projectInfo.startIn),
						endIn: new Date(projectInfo.endIn),
						objectives: projectInfo.objectives,
						project_manager: projectInfo.project_manager,
						budget: projectInfo.budget * 1,
						scope: projectInfo.scope,
					},
				},
			});
			//
			console.log(data);
			setSuccessMessage('saved successfully!');
			setErrorMessage('');
			onSave(projectInfo);
			console.log(projectInfo);

			setDataSaved(true);
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
								/>
							</label>

							<label htmlFor="startDatePicker">
								Project Start Date
								<input
									type="date"
									id="startDatePicker"
									value={startDateString || ''}
									onChange={(e) =>
										handleInputChange('startIn', e.target.value)
									}
								/>
							</label>

							<label htmlFor="finishDatePicker">
								Project Finish Date
								<input
									type="date"
									id="finishDatePicker"
									value={finishDateString || ''}
									onChange={(e) =>
										handleInputChange('endIn', e.target.value)
									}
								/>
							</label>
							<label>
								Project Objectives
								<textarea
									value={projectInfo.objectives}
									onChange={(e) =>
										handleInputChange('objectives', e.target.value)
									}
								/>
							</label>
							<label>
								Project Manager
								<input
									type="text"
									value={projectInfo.project_manager}
									onChange={(e) =>
										handleInputChange(
											'project_manager',
											e.target.value
										)
									}
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
								/>
							</label>
							<label>
								Project Scope Statements
								<textarea
									value={projectInfo.scope}
									onChange={(e) =>
										handleInputChange('scope', e.target.value)
									}
								/>
							</label>
							<div>
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

export default UpdateInitiation;
