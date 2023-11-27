import { GraphQLResolveInfo } from 'graphql';
import { createSdd, getSdd, getSdds } from '../services/sdd.service';

export const sddResolver = {
	Query: {
		// 1.resolver for the sdds query
		async sdds(
			_: any,
			args: Record<string, any>,
			context: any,
			info: GraphQLResolveInfo
		) {
			return getSdds({ info });
		},

		// 2.resolver for the sdd query
		async sdd(
			_: any,
			args: Record<string, any>,
			context: any,
			info: GraphQLResolveInfo
		) {
			return getSdd({ id: args.id, info });
		},
	},

	Mutation: {
		// 3.resolver for the createSdd mutation
		async createSdd(_: any, { input }: Record<string, any>) {
			return await createSdd({
				uml: input.uml,
				projectId: input.projectId,
			});
		},
	},
};
