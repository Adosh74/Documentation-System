import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { GraphQLResolveInfo } from 'graphql';
import path from 'path';
import { extractSelections } from '../utils/extractSelections';

interface GetSrssArgs {
	info: GraphQLResolveInfo;
}

interface GetSrsArgs extends GetSrssArgs {
	id: string;
}

interface SrsInput {
	intro: string;
	purpose: string;
	intended_audience: string;
	description: string;
	requirements: string;
	use_case: string;
	projectId: string;
}

interface UpdateSrsInput {
	id: string;
	intro: string;
	purpose: string;
	intended_audience: string;
	description: string;
	requirements: string;
	use_case: string;
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

// *** 3. create srs service *** //
export const createSrs = async ({
	intro,
	purpose,
	intended_audience,
	description,
	requirements,
	use_case,
	projectId,
}: SrsInput) => {
	const createdSrs = await prisma.sRS.create({
		data: {
			intro,
			purpose,
			intended_audience,
			description,
			requirements,
			use_case,
			projectId,
		},
	});
	return createdSrs;
};

// *** 4. update srs service *** //
export const updateSrs = async ({
	id,
	intro,
	purpose,
	intended_audience,
	description,
	requirements,
	use_case,
}: UpdateSrsInput) => {
	const updatedSrs = await prisma.sRS.update({
		where: { id },
		data: {
			intro,
			purpose,
			intended_audience,
			description,
			requirements,
			use_case,
		},
	});
	return updatedSrs;
};

// *** 5. delete srs service *** //
export const deleteSrs = async (id: string) => {
	const deletedSrs = await prisma.sRS.delete({
		where: { id },
	});

	// delete the image from the public/images folder
	const pathName = path.join(process.cwd(), `/public/images/${deletedSrs.use_case}`);
	fs.unlinkSync(pathName);

	return deletedSrs;
};
