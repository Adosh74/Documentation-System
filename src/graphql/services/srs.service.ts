import { PrismaClient } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
import { extractSelections } from '../utils/extractSelections';

interface GetSrssArgs {
	info: GraphQLResolveInfo;
}

interface GetSrsArgs extends GetSrssArgs {
	id: string;
}

const prisma = new PrismaClient();

// *** 1. get all srs service *** //
export const getSrss = async ({ info }: GetSrssArgs) => {
	const extractedSelections = extractSelections(info);
	const projectIncluded = extractedSelections.includes('project');

	if (projectIncluded) return await prisma.sRS.findMany({ include: { project: true } });

	return await prisma.sRS.findMany();
};

// *** 2. get srs by id service *** //
export const getSrs = async ({ id, info }: GetSrsArgs) => {
	const extractedSelections = extractSelections(info);
	const projectIncluded = extractedSelections.includes('project');

	if (projectIncluded)
		return await prisma.sRS.findUnique({
			where: { id },
			include: { project: true },
		});

	return await prisma.sRS.findUnique({
		where: { id },
	});
};
