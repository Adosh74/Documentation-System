'use client';

import Header from '@/components/Header';
import Projectss from '@/components/Projects';
import SDLC from '@/components/SDLC';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { AppProps } from 'next/app';
import { Component, use, useEffect, useState } from 'react';
import styles from './page.module.css';

export const client = new ApolloClient({
	link: createUploadLink({
		uri: 'http://localhost:3001/graphql',
		headers: { 'Apollo-Require-Preflight': 'true' },
	}),
	cache: new InMemoryCache(),
});

const Projects = gql`
	query Projects {
		projects {
			id
			title
			startIn
			endIn
		}
	}
`;

function Home() {
	const { data } = useQuery(Projects, { client });
	console.log('data', data);

	const [cards, setCards] = useState([]);

	const projects: any = data?.projects.map((el: any) => {
		return {
			id: el.id,
			title: el.title,
			// convert from millisecond to date
			startDate: new Date(el.startIn * 1).toString().toString().split('T')[0],
			endDate: new Date(el.endIn * 1).toString().split('T')[0],
		};
	});

	console.log('projects', projects);

	const contentCards = [
		{ title: 'Card 1', startDate: '2023-01-01', endDate: '2023-01-10' },
		{ title: 'Card 2', startDate: '2023-02-05', endDate: '2023-02-15' },
		{ title: 'Card 3', startDate: '2023-05-06', endDate: '2023-07-15' },

		// Add more content cards as needed
	];

	/// run query in use effect to get data from db and set it to content cards
	// useEffect(() => {
	// 	const data = client.query({
	// 		query: Projects,
	// 	});
	// 	console.log('data', data);
	// 	const projects: any = data.data.projects;
	// 	console.log('projects', projects);
	// 	const contentCards = projects.map((project) => {
	// 		return {
	// 			title: project.title,
	// 			startDate: project.startIn,
	// 			endDate: project.endIn,
	// 		};
	// 	});
	// 	console.log('contentCards', contentCards);
	// 	setCards(contentCards);
	// }, []);

	return (
		<ApolloProvider client={client}>
			<main>
				<Header />
				<div className={styles.home}>
					{projects && projects.length > 0 && <Projectss cards={projects} />}
				</div>
			</main>
		</ApolloProvider>
	);
}

export default Home;
