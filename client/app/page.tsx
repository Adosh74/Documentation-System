'use client';

import Header from '@/components/Header';
import SDLC from '@/components/SDLC';
import { AppProps } from 'next/app';
import { Component } from 'react';
import styles from './page.module.css';

function Home() {
	return (
		<main>
			<Header />
			<div className={styles.home}></div>
		</main>
	);
}

export default Home;
