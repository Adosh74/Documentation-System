import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV } = process.env;

export default {
	env: NODE_ENV,
};
