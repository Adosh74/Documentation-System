import express, { Request, Response } from 'express';

export const app = express();

app.use(express.json());

// root route
app.get('/', (req, res) => {
	res.send('Documentation system for the API(GraphQL)');
});

// monitor the health of the application
app.get('/healthz', (req: Request, res: Response) =>
	res.status(200).json({ success: true, message: 'Ok' })
);
