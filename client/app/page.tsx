'use client';

import Header from '@/components/Header';
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
