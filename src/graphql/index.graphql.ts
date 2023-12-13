import fs from 'fs';
import { GraphQLUpload } from 'graphql-upload-ts';
import path from 'path';
import { projectResolver } from './resolvers/project.resolver';
import { sddResolver } from './resolvers/sdd.resolver';
import { srsResolver } from './resolvers/srs.resolver';
import { uploadImage } from './resolvers/uploadImage.resolver';

// read the typeDefs from the typeDefs folder
const projectType = fs.readFileSync(
	path.join(__dirname, './typeDefs/project.graphql'),
	'utf-8'
);
const srsType = fs.readFileSync(path.join(__dirname, './typeDefs/srs.graphql'), 'utf-8');
const sddType = fs.readFileSync(path.join(__dirname, './typeDefs/sdd.graphql'), 'utf-8');
const uploadImageType = fs.readFileSync(
	path.join(__dirname, './typeDefs/uploadImage.graphql'),
	'utf-8'
);

export const typeDefs = `
    ${projectType}
	${srsType}
	${sddType}
	${uploadImageType}
`;

export const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		...projectResolver.Query,
		...sddResolver.Query,
		...srsResolver.Query,
	},
	Mutation: {
		...projectResolver.Mutation,
		...sddResolver.Mutation,
		...srsResolver.Mutation,
		uploadImage,
	},
};
