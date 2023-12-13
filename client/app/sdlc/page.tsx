'use client';

import Header from '@/components/Header';
import ViewPhases from '@/components/ViewPhases';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';

// create client
export const client = new ApolloClient({
	link: createUploadLink({
		uri: 'http://localhost:3001/graphql',
		headers: { 'Apollo-Require-Preflight': 'true' },
	}),
	cache: new InMemoryCache(),
});

// create query
const Project = gql`
	query Project($projectId: String!) {
		project(id: $projectId) {
			id
			title
			startIn
			endIn
			objectives
			project_manager
			budget
			scope
			sdds {
				id
				uml
			}
			srss {
				id
				intro
				purpose
				intended_audience
				description
				requirements
				use_case
			}
		}
	}
`;

interface initiation {
	id: string;
	title?: string;
	startIn?: Date;
	endIn?: Date;
	objectives?: string;
	project_manager?: string;
	budget?: number;
	scope?: string;
	sdds?: sdd[];
	srss?: srs[];
}
interface srs {
	id?: string;
	intro?: string;
	purpose?: string;
	intended_audience?: string;
	description?: string;
	requirements?: string;
	use_case?: string;
}

interface sdd {
	id?: string;
	uml?: string[];
}

//        Example Data

const InitiationProjectInfo: any = {
	title: 'Initial Title',
	startDate: new Date('2023-12-03'),
	finishDate: new Date('2023-12-20'),
	objectives: 'Initial Objectives',
	projectManager: 'Initial Project Manager',
	budget: 'Initial Budget',
	scopeStatements: 'Initial Scope Statements',
};
const formattedInitiationProjectInfo = {
	...InitiationProjectInfo,
	startDate: InitiationProjectInfo.startDate
		? InitiationProjectInfo.startDate.toISOString().split('T')[0]
		: '',
	finishDate: InitiationProjectInfo.finishDate
		? InitiationProjectInfo.finishDate.toISOString().split('T')[0]
		: '',
};

const SRSProjectInfo: any = {
	introduction: 'Hello',
	purposeOfSoftwareBeingDeveloped: 'purposeOfSoftwareBeingDeveloped',
	intendedAudience: 'intendedAudience',
	overallDescriptionOfTheSoftware: 'overallDescriptionOfTheSoftware',
	systemFeaturesAndRequirements: 'systemFeaturesAndRequirements',
	browserImage: '../icon.png',
};

const SDDProjectInfo: any = [
	{ id: 1, file: '../icon.png', fileName: 'Database Design' },
	{ id: 2, file: '../icon.png', fileName: 'UML Diagrams' },
];

//* /////////////////////////////////////////////////////////////////////// */

const Sdlc: React.FC = () => {
	const [projectInfo1, setProjectInfo1] = useState<any>(formattedInitiationProjectInfo);
	const [projectInfo2, setProjectInfo2] = useState<any>(SRSProjectInfo);
	const [projectInfo3, setProjectInfo3] = useState<any>(SDDProjectInfo);
	// get params from url
	const params = useSearchParams();
	console.log('params', params.get('projectId'));

	// use query to get data
	const { loading, error, data } = useQuery(Project, {
		client,
		variables: { projectId: params.get('projectId') },
	});

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error :</p>;
	}

	console.log('data.project', data.project);
	console.log('data.project.srs', data.project.srss[0]);
	console.log('data.project.sdd', data.project.sdds[0]);

	return (
		<ApolloProvider client={client}>
			<div className={styles.body}>
				<Header />
				<ViewPhases
					InitiationProjectInfo={projectInfo1}
					SRSProjectInfo={projectInfo2}
					SDDProjectInfo={projectInfo3}
				/>
			</div>
		</ApolloProvider>
	);
};

export default Sdlc;
