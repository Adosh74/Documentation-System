import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { GraphQLResolveInfo } from 'graphql';
import path from 'path';
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

interface UpdateSddInput {
	id: string;
	uml: [string];
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
	console.log('input', uml, projectId);

	const sdd = await prisma.sDD.create({
		data: {
			uml,
			projectId,
		},
	});
	return sdd;
};

/// ***  4. update a sdd *** ///
export const updateSdd = async ({ id, uml }: UpdateSddInput) => {
	const sdd = await prisma.sDD.update({
		where: { id },
		data: {
			uml,
		},
	});
	return sdd;
};

/// ***  5. delete a sdd *** ///
export const deleteSdd = async (id: string) => {
	const sdd = await prisma.sDD.delete({ where: { id } });
	// delete sdd uml from public/images
	sdd.uml.forEach((uml) => {
		const pathName = path.join(process.cwd(), `/public/images/${uml}`);
		fs.unlinkSync(pathName);
	});

	return sdd;
};
