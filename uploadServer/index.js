/* eslint-disable */
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolver');
const cors = require('cors');
const { graphqlUploadExpress } = require('graphql-upload');
async function startServer() {
	const app = express();

	const server = new ApolloServer({ typeDefs, resolvers });
	await server.start();
	app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
	server.applyMiddleware({ app });

	app.use(express.static('public'));
	app.use(cors());

	app.get('/friends', (req, res) => {
		res.send('friends list');
	});

	app.listen(4000, () => {
		console.log('Server is running on port 4000');
	});
}

startServer();
