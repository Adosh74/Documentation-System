import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	icons: {
		icon: '/icon.png',
	},
	title: { default: 'Documentation System', template: ' %s | Documentation System ' },
	description:
		'This app is where you will store your Software Development Life Cycle Documentation. This application includes some common phases of software development: Project Initiation, Planning, Requirements (Analysis), Design, Development, Testing, Deployment, and Maintenance. Each phase will have its own documentation. Each documentation will have its own files. Each file will have its own version. Each version will have its own content. Each content will have its own author. Each author will have its own name.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
