/* eslint-disable */
const { GraphQLUpload } = require('graphql-upload');
const path = require('path');
const fs = require('fs');

const resolvers = {
	Upload: GraphQLUpload,

	Query: {
		getAllUsers: () => {
			return 'Hello World';
		},
	},

	Mutation: {
		uploadFile: async (_, args) => {
			let imageName = 'default.jpg';
			const { createReadStream, filename } = await args.file;
			const { ext, name } = path.parse(filename);

			const stream = createReadStream();
			imageName = `image-${Date.now() + Math.random() * 100}${ext}`;
			const pathName = path.join(
				process.cwd(),
				'..',
				`/public/images/${imageName}`
			);

			await stream.pipe(fs.createWriteStream(pathName));

			return {
				imageName,
			};

			// const { createReadStream, filename } = await args.file;

			// const { ext, name } = path.parse(filename);
			// const randomName = generateRandomString(12) + ext;

			// const stream = createReadStream();
			// const pathName = path.join(__dirname, '..', `/public/images/${randomName}`);
			// await stream.pipe(fs.createWriteStream(pathName));

			// return {
			// 	url: `http://localhost:4000/images/${randomName}`,
			// };
		},
	},
};

module.exports = { resolvers };
