'use client';

import Header from '@/components/Header';
import Projects from '@/components/Projects';
import SDLC from '@/components/SDLC';
import { AppProps } from 'next/app';
import { Component } from 'react';
import styles from './page.module.css';

function Home() {
	const contentCards = [
		{ title: 'Card 1', startDate: '2023-01-01', endDate: '2023-01-10' },
		{ title: 'Card 2', startDate: '2023-02-05', endDate: '2023-02-15' },
		{ title: 'Card 3', startDate: '2023-05-06', endDate: '2023-07-15' },

		// Add more content cards as needed
	];
	return (
		<main>
			<Header />
			<div className={styles.home}>
				<Projects cards={contentCards} />
			</div>
		</main>
	);
}

export default Home;
