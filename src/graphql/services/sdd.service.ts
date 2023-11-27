import { PrismaClient } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
import { extractSelections } from '../utils/extractSelections';

interface GetSddsArgs {
	info: GraphQLResolveInfo;
}

interface GetSddArgs extends GetSddsArgs {
	id: string;
}

interface SddInput {
	uml: [string];
	projectId: string;
}

const prisma = new PrismaClient();

/// ***  1. get all sdds *** ///
export const getSdds = async ({ info }: GetSddsArgs) => {
	const extractedSelections = extractSelections(info);
	const projectIncluded = extractedSelections.includes('project');

	if (projectIncluded) return await prisma.sDD.findMany({ include: { project: true } });

	return await prisma.sDD.findMany();
};

/// ***  2. get a single sdd *** ///
export const getSdd = async ({ id, info }: GetSddArgs) => {
	const extractedSelections = extractSelections(info);
	const projectIncluded = extractedSelections.includes('project');

	if (projectIncluded)
		return await prisma.sDD.findUnique({
			where: { id },
			include: { project: true },
		});

	return await prisma.sDD.findUnique({ where: { id } });
};

/// ***  3. create a sdd *** ///
export const createSdd = async ({ uml, projectId }: SddInput) => {
	const sdd = await prisma.sDD.create({
		data: {
			uml,
			projectId,
		},
	});
	return sdd;
};
