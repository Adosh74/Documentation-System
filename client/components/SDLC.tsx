'use client';

import { Iinitiation, Isdd, Isrs } from '@/app/sdlc/page';
import ViewInitiation from '@/components/ViewInitiation';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useMutation } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import React, { useState } from 'react';
import styles from './Styles.module.css';
import UpdateInitiation from './UpdateInitiation';
import UpdateSDD from './UpdateSDD';
import UpdateSRS from './UpdateSRS';
import ViewSDD from './ViewSDD';
import ViewSRS from './ViewSRS';

export const client = new ApolloClient({
	link: createUploadLink({
		uri: 'http://localhost:3001/graphql',
		headers: { 'Apollo-Require-Preflight': 'true' },
	}),
	cache: new InMemoryCache(),
});

// graphql mutation for delete sdd
const DeleteSdd = gql`
	mutation DeleteSdd($deleteSddId: String!) {
		deleteSdd(id: $deleteSddId) {
			uml
		}
	}
`;

// delete srs mutation
const DeleteSrs = gql`
	mutation DeleteSrs($deleteSrsId: String!) {
		deleteSrs(id: $deleteSrsId) {
			intro
		}
	}
`;

// delete initiation mutation
const DeleteProject = gql`
	mutation DeleteProject($deleteProjectId: String!) {
		deleteProject(id: $deleteProjectId) {
			title
		}
	}
`;

interface Info {
	InitiationProjectInfo: Iinitiation;
	SRSProjectInfo: Isrs;
	SDDProjectInfo: Isdd;
}

const SDLC: React.FC<Info> = ({
	InitiationProjectInfo,
	SRSProjectInfo,
	SDDProjectInfo,
}) => {
	const [projectInfo1, setProjectInfo1] = useState<Iinitiation | any>(
		InitiationProjectInfo
	);
	const [projectInfo2, setProjectInfo2] = useState<Isrs | any>(SRSProjectInfo);
	const [projectInfo3, setProjectInfo3] = useState<Isdd | any>(SDDProjectInfo);

	const [isEditing1, setIsEditing1] = useState<boolean>(false);
	const [isEditing2, setIsEditing2] = useState<boolean>(false);
	const [isEditing3, setIsEditing3] = useState<boolean>(false);

	// use mutation
	const [deleteSdd] = useMutation(DeleteSdd, { client });
	const [deleteSrs] = useMutation(DeleteSrs, { client });
	const [deleteProject] = useMutation(DeleteProject, { client });

	const handleSave1 = (updatedInfo: any) => {
		setProjectInfo1(updatedInfo);
		setIsEditing1(false);
	};
	const handleEdit1 = () => {
		setIsEditing1(true);
	};
	const handleDelete1 = async () => {
		await deleteProject({ variables: { deleteProjectId: projectInfo1.id } });
		// navigate to home page
		window.location.href = '/';
		setProjectInfo1(null);
	};

	const handleSave2 = (updatedInfo: any) => {
		setProjectInfo2(updatedInfo);
		setIsEditing2(false);
	};
	const handleEdit2 = () => {
		setIsEditing2(true);
	};
	const handleDelete2 = async () => {
		await deleteSrs({ variables: { deleteSrsId: projectInfo2.id } });
		setProjectInfo2(null);
	};

	const handleSave3 = (updatedInfo: any) => {
		setProjectInfo3(updatedInfo);
		setIsEditing3(false);
	};
	const handleEdit3 = () => {
		setIsEditing3(true);
	};
	const handleDelete3 = async () => {
		await deleteSdd({ variables: { deleteSddId: projectInfo3.id } });
		setProjectInfo3(null);
	};

	return (
		<ApolloProvider client={client}>
			<div className={styles.view}>
				<div>
					{isEditing1 ? (
						<UpdateInitiation
							onSave={handleSave1}
							initialProjectInfoo={projectInfo1}
						/>
					) : (
						projectInfo1 && (
							<ViewInitiation
								projectInfo={projectInfo1}
								onEdit={handleEdit1}
								onDelete={handleDelete1}
							/>
						)
					)}
				</div>
				<div>
					{isEditing2 ? (
						<UpdateSRS onSave={handleSave2} srsPhaseInfo={projectInfo2} />
					) : (
						projectInfo2 && (
							<ViewSRS
								projectInfo={projectInfo2}
								onEdit={handleEdit2}
								onDelete={handleDelete2}
							/>
						)
					)}
				</div>
				<div style={{ marginBottom: '0em' }}>
					{isEditing3 ? (
						<UpdateSDD onSave={handleSave3} sddPhaseInfo={projectInfo3} />
					) : (
						projectInfo3 && (
							<ViewSDD
								projectInfo={projectInfo3}
								onEdit={handleEdit3}
								onDelete={handleDelete3}
							/>
						)
					)}
				</div>
			</div>
		</ApolloProvider>
	);
};

export default SDLC;
