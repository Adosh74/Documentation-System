import { app } from './app';
import envConfig from './config/env.config';

app.listen(3001, () => {
	if (envConfig.env === 'development') {
		console.log('Server started at http://localhost:3001');
		console.log('GraphQL server started at http://localhost:3001/graphql');
	}
});
