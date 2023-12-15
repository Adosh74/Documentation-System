import { PrismaClient } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
import { extractSelections } from '../utils/extractSelections';

interface GetProjectsArgs {
	info: GraphQLResolveInfo;
}

interface GetProjectArgs extends GetProjectsArgs {
	id: string;
}

interface ProjectInput {
	title?: string;
	startIn?: Date;
	endIn?: Date;
	objectives?: string;
	project_manager?: string;
	budget?: number;
	scope?: string;
}

interface UpdateProjectInput extends ProjectInput {
	id: string;
}

const prisma = new PrismaClient();

// *** 1. Get all projects service *** //
export const getProjects = async ({ info }: GetProjectsArgs) => {
	const extractedSelections = extractSelections(info);
	const srsIncluded = extractedSelections.includes('srss');
	const sddIncluded = extractedSelections.includes('sdds');

	if (srsIncluded && sddIncluded)
		return await prisma.project.findMany({ include: { srss: true, sdds: true } });

	if (srsIncluded) return await prisma.project.findMany({ include: { srss: true } });

	if (sddIncluded) return await prisma.project.findMany({ include: { sdds: true } });

	return await prisma.project.findMany();
};

// *** 2. Get project by id service *** //
export const getProject = async ({ id, info }: GetProjectArgs) => {
	const extractedSelections = extractSelections(info);
	const srsIncluded = extractedSelections.includes('srss');
	const sddIncluded = extractedSelections.includes('sdds');

	if (srsIncluded && sddIncluded)
		return await prisma.project.findUnique({
			where: { id },
			include: { srss: true, sdds: true },
		});

	if (srsIncluded)
		return await prisma.project.findUnique({
			where: { id },
			include: { srss: true },
		});

	if (sddIncluded)
		return await prisma.project.findUnique({
			where: { id },
			include: { sdds: true },
		});

	return await prisma.project.findUnique({ where: { id } });
};

// *** 3. Create project service *** //
export const createProject = async ({
	title,
	startIn,
	endIn,
	objectives,
	budget,
	project_manager,
	scope,
}: ProjectInput) => {
	const createdProject = await prisma.project.create({
		data: {
			title,
			startIn,
			endIn,
			objectives,
			project_manager,
			budget,
			scope,
		},
	});

	return createdProject;
};

// *** 4. Update project service *** //
export const updateProject = async ({
	id,
	title,
	startIn,
	endIn,
	objectives,
	budget,
	project_manager,
	scope,
}: UpdateProjectInput) => {
	const updatedProject = await prisma.project.update({
		where: { id },
		data: {
			title,
			startIn,
			endIn,
			objectives,
			budget,
			project_manager,
			scope,
		},
	});

	return updatedProject;
};

/// *** 5. Delete project service *** //
export const deleteProject = async (id: string) => {
	console.log('id', id);
	// delete all srs and sdds related to the project
	await prisma.sRS.deleteMany({ where: { projectId: id } });
	await prisma.sDD.deleteMany({ where: { projectId: id } });

	const deletedProject = await prisma.project.delete({ where: { id } });

	return deletedProject;
};
