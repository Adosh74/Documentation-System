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

export interface Iinitiation {
	id: string;
	title?: string;
	startIn?: string;
	endIn?: string;
	objectives?: string;
	project_manager?: string;
	budget?: number;
	scope?: string;
}
export interface Isrs {
	id?: string;
	intro?: string;
	purpose?: string;
	intended_audience?: string;
	description?: string;
	requirements?: string;
	use_case?: string;
}

export interface Isdd {
	id?: string;
	uml?: string[];
}

//* /////////////////////////////////////////////////////////////////////// */

const Sdlc: React.FC = () => {
	// const [projectInfo1, setProjectInfo1] = useState<any>(InitiationProjectInfo);
	// const [projectInfo2, setProjectInfo2] = useState<any>(SRSProjectInfo);
	// const [projectInfo3, setProjectInfo3] = useState<any>(SDDProjectInfo);
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

	// console.log('data.project', data.project);
	// console.log('data.project.srs', data.project.srss[0]);
	// console.log('data.project.sdd', data.project.sdds[0]);

	// fill data in initiation and srs and sdd
	const InitiationProjectInfoData: Iinitiation = {
		id: data.project.id,
		title: data.project.title,
		startIn: new Date(data.project.startIn * 1).toString().split('T')[0],
		endIn: new Date(data.project.endIn * 1).toString().split('T')[0],
		objectives: data.project.objectives,
		project_manager: data.project.project_manager,
		budget: data.project.budget,
		scope: data.project.scope,
	};

	const SRSProjectInfoData: Isrs = {
		id: '',
		intro: '',
		purpose: '',
		intended_audience: '',
		description: '',
		requirements: '',
		use_case: '',
	};

	if (data.project.srss[0]) {
		SRSProjectInfoData.id = data.project.srss[0].id;
		SRSProjectInfoData.intro = data.project.srss[0].intro;
		SRSProjectInfoData.purpose = data.project.srss[0].purpose;
		SRSProjectInfoData.intended_audience = data.project.srss[0].intended_audience;
		SRSProjectInfoData.description = data.project.srss[0].description;
		SRSProjectInfoData.requirements = data.project.srss[0].requirements;
		SRSProjectInfoData.use_case = data.project.srss[0].use_case;
	}

	const SDDProjectInfoData: Isdd = {
		id: '',
		uml: [],
	};

	if (data.project.sdds[0]) {
		SDDProjectInfoData.id = data.project.sdds[0].id;
		SDDProjectInfoData.uml = data.project.sdds[0].uml;
	}

	console.log('InitiationProjectInfoData', InitiationProjectInfoData);
	console.log('SRSProjectInfoData', SRSProjectInfoData);
	console.log('SDDProjectInfoData', SDDProjectInfoData);

	return (
		<ApolloProvider client={client}>
			<div className={styles.body}>
				<Header />
				<ViewPhases
					InitiationProjectInfoData={InitiationProjectInfoData}
					SRSProjectInfoData={SRSProjectInfoData}
					SDDProjectInfoData={SDDProjectInfoData}
				/>
			</div>
		</ApolloProvider>
	);
};

export default Sdlc;
