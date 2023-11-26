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
	title: string;
	startIn: Date;
	endIn: Date;
	objectives: string;
	project_manager: string;
	budget: number;
	scope: string;
}

const prisma = new PrismaClient();

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
			budget,
			project_manager,
			scope,
		},
	});

	return createdProject;
};
