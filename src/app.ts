import express, { Request, Response } from 'express';
import morgan from 'morgan';
import envConfig from './config/env.config';

export const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (envConfig.env === 'development') app.use(morgan('dev'));

// root route
app.get('/', (req, res) => {
	res.send('Documentation system for the API(GraphQL)');
});

// monitor the health of the application
app.get('/healthz', (req: Request, res: Response) =>
	res.status(200).json({ success: true, message: 'Ok' })
);
