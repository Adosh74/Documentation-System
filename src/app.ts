import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import envConfig from './config/env.config';
import { resolvers, typeDefs } from './graphql/index.graphql';

export const app = express();

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.start().then(() => {
	//middleware
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	if (envConfig.env === 'development') app.use(morgan('dev'));

	// root route
	app.use('/graphql', expressMiddleware(server));

	app.get('/', (req: Request, res: Response) => {
		res.send('Documentation system for the API(GraphQL)');
	});

	// monitor the health of the application
	app.get('/healthz', (req: Request, res: Response) =>
		res.status(200).json({ success: true, message: 'Ok' })
	);
});
