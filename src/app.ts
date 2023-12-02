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

server
	.start()
	.then(() => {
		// *** middleware *** //
		// allow cross origin requests from the frontend server
		app.use(
			cors({
				origin: 'http://localhost:3000',
				credentials: true,
			})
		);
		// parse incoming requests
		app.use(express.json({ limit: '50mb' }));
		app.use(express.urlencoded({ extended: true }));

		// logging
		if (envConfig.env === 'development') app.use(morgan('dev'));

		// *** root route *** //
		app.use('/graphql', expressMiddleware(server));

		app.get('/', (req: Request, res: Response) => {
			res.send('Documentation system for the API(GraphQL)');
		});

		// monitor the health of the application
		app.get('/healthz', (req: Request, res: Response) =>
			res.status(200).json({ success: true, message: 'Ok' })
		);
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
