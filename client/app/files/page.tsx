'use client';

import AllFiles from '@/components/AllFiles';
import Header from '@/components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import styles from './page.module.css';

const client = new ApolloClient({
	link: createUploadLink({
		uri: 'http://localhost:3001/graphql',
		headers: { 'Apollo-Require-Preflight': 'true' },
	}),
	cache: new InMemoryCache(),
});

// query for all files
const Projects = gql`
	query Query {
		projects {
			srss {
				use_case
			}
			sdds {
				uml
			}
		}
	}
`;

function files() {
	const files: any = [
		{ id: 1, file: '../icon.png', fileName: 'Database Design' },
		{ id: 2, file: '../icon.png', fileName: 'UML Diagrams' },
	];

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { loading, error, data } = useQuery(Projects, { client });

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error :</p>;
	}
	console.log(data);
	const imageNames = data.projects.flatMap((project: any) => {
		const srssImages = project.srss.map((srs: any) => srs.use_case);
		const umlImages = project.sdds.flatMap((sdd: any) => sdd.uml);
		return [...srssImages, ...umlImages];
	});
	console.log(imageNames);

	return (
		<ApolloProvider client={client}>
			<div className={styles.section}>
				<Header />
				<div className="p-5 text-center bg-image">
					<div style={{ borderRadius: '50em' }}>
						<AllFiles files={imageNames} />
					</div>
				</div>
			</div>
		</ApolloProvider>
	);
}

export default files;
