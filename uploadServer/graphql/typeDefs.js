/* eslint-disable */
const { gql } = require('apollo-server-express');
const typeDefs = gql`
	scalar Upload

	type File {
		imageName: String!
	}

	type Query {
		getAllUsers: String!
	}

	type Mutation {
		uploadFile(file: Upload!): File!
	}
`;

module.exports = { typeDefs };
