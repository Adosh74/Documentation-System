import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import http from 'http';
import morgan from 'morgan';
import envConfig from './config/env.config';
import { resolvers, typeDefs } from './graphql/index.graphql';

export const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	// plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	csrfPrevention: false,
});

server
	.start()
	.then(() => {
		// *** middleware *** //
		// allow cross origin requests from the frontend server
		// app.use(cors());

		app.use(express.static('public'));

		// enable file uploads in graphql
		// app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

		// parse incoming requests
		// app.use(express.json({ limit: '50mb' }));
		// app.use(express.urlencoded({ extended: true }));

		// logging
		if (envConfig.env === 'development') app.use(morgan('dev'));

		// *** root route *** //
		app.use(
			'/graphql',
			bodyParser.json({ limit: '50mb' }),
			cors(),
			graphqlUploadExpress({ maxFileSize: 900000000000, maxFiles: 10 }),
			expressMiddleware(server, {
				context: async ({ req }) => ({ token: req.headers.token }),
			})
		);

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
