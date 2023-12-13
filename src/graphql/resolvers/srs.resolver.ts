import fs from 'fs';
import { GraphQLResolveInfo } from 'graphql';
import path from 'path';
import {
	createSrs,
	deleteSrs,
	getSrs,
	getSrss,
	updateSrs,
} from '../services/srs.service';

export const srsResolver = {
	Query: {
		// *** 1.resolver for the srss query *** //
		async srss(
			_: any,
			args: Record<string, any>,
			context: any,
			info: GraphQLResolveInfo
		) {
			return getSrss({ info });
		},
		// *** 2.resolver for the srs query *** //
		async srs(
			_: any,
			args: Record<string, any>,
			context: any,
			info: GraphQLResolveInfo
		) {
			return getSrs({ id: args.id, info });
		},
	},
	Mutation: {
		// *** 3.resolver for the createSrs mutation *** //
		async createSrs(_: any, { input }: Record<string, any>) {
			// 	const { createReadStream, filename } = await file;
			// 	const { ext, name } = path.parse(filename);
			// 	console.log('ext', ext);

			// 	const stream = createReadStream();
			// 	imageName = `srs-${Date.now() + Math.random() * 100}${ext}`;
			// 	const pathName = path.join(process.cwd(), `/public/images/${imageName}`);
			// 	await stream.pipe(fs.createWriteStream(pathName));
			// }

			return await createSrs({
				intro: input.intro,
				purpose: input.purpose,
				intended_audience: input.intended_audience,
				description: input.description,
				requirements: input.requirements,
				use_case: input.use_case,
				projectId: input.projectId,
			});
		},

		// *** 4.resolver for the updateSrs mutation *** //
		async updateSrs(_: any, { id, input }: Record<string, any>) {
			console.log('id', id);
			console.log('input', input);

			return await updateSrs({
				id: id,
				intro: input.intro,
				purpose: input.purpose,
				intended_audience: input.intended_audience,
				description: input.description,
				requirements: input.requirements,
				use_case: input.use_case,
			});
		},

		// *** 5.resolver for the deleteSrs mutation *** //
		async deleteSrs(_: any, { id }: Record<string, any>) {
			return await deleteSrs(id);
		},
	},
};
