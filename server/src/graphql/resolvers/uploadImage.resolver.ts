import fs from 'fs';
import path from 'path';

export const uploadImage = async ({ image }: any) => {
	let imageName = 'default.png';

	const { createReadStream, filename } = await image;
	const { ext, name } = path.parse(filename);
	console.log('ext', ext);

	const stream = createReadStream();
	imageName = `srs-${Date.now() + Math.random() * 100}${ext}`;
	const pathName = path.join(process.cwd(), `/public/images/${imageName}`);
	await stream.pipe(fs.createWriteStream(pathName));

	return imageName;
};
