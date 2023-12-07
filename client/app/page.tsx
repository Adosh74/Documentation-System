'use client';
import { AppProps } from 'next/app';
import { Component } from "react";
import Header from '@/components/Header';
import styles from './page.module.css';
import SDLC from '@/components/SDLC';


function Home() {
	return (
		<main>
			<Header />
			<div className={styles.home}>

			</div>
		</main>
	);
}

export default Home;
