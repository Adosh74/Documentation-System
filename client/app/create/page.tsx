'use client';

import ChoosePhase from '@/components/ChoosePhase';
import Header from '@/components/Header';
import { useReducer } from 'react';
import styles from './page.module.css';

function create() {
	return (
		<>
			<Header />
			<ChoosePhase />

			<div>
				<div className={styles.section}></div>
			</div>
		</>
	);
}

export default create;
