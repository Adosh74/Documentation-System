import { GraphQLResolveInfo } from 'graphql';
import {
	createProject,
	deleteProject,
	getProject,
	getProjects,
	updateProject,
} from '../services/project.service';

export const projectResolver = {
	Query: {
		// 1.resolver for the projects query
		async projects(
			_: any,
			args: Record<string, any>,
			context: any,
			info: GraphQLResolveInfo
		) {
			return getProjects({ info });
		},
		// 2.resolver for the project query
		async project(
			_: any,
			args: Record<string, any>,
			context: any,
			info: GraphQLResolveInfo
		) {
			return getProject({ id: args.id, info });
		},
	},
	Mutation: {
		// *** 3.resolver for the createProject mutation *** //
		async createProject(_: any, { input }: Record<string, any>) {
			return await createProject({
				title: input.title,
				startIn: new Date(input.startIn),
				endIn: new Date(input.endIn),
				objectives: input.objectives,
				budget: input.budget * 1,
				project_manager: input.project_manager,
				scope: input.scope,
			});
		},
		// 4.resolver for the updateProject mutation
		async updateProject(_: any, { input }: Record<string, any>) {
			return await updateProject({
				id: input.id,
				title: input.title,
				startIn: input.startIn,
				endIn: input.endIn,
				objectives: input.objectives,
				budget: input.budget,
				project_manager: input.project_manager,
				scope: input.scope,
			});
		},
		// 5.resolver for the deleteProject mutation
		async deleteProject(_: any, { id }: Record<string, any>) {
			return await deleteProject(id);
		},
	},
};
