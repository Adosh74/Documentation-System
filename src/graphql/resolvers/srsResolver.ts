import { GraphQLResolveInfo } from 'graphql';
import { createSrs, getSrs, getSrss } from '../services/srs.service';

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
	},
};
