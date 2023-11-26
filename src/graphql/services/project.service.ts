import { PrismaClient } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
import { extractSelections } from '../utils/extractSelections';

interface GetProjectsArgs {
	info: GraphQLResolveInfo;
}

interface GetProjectArgs extends GetProjectsArgs {
	id: string;
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
