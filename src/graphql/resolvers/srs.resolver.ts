import { GraphQLResolveInfo } from 'graphql';
import { getSrs, getSrss } from '../services/srs.service';

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
};
