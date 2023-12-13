'use client';

import ChoosePhase from '@/components/ChoosePhase';
import Header from '@/components/Header';
import Initiation from '@/components/Initiation';
import { useReducer } from 'react';
import styles from './page.module.css';

const initialProjectInfo = {
	title: '',
	startDate: null,
	finishDate: null,
	objectives: '',
	projectManager: '',
	budget: '',
	scopeStatements: '',
};

function create() {
	return (
		<>
			<Header />
			<Initiation
				onSave={() => {
					return;
				}}
				initialProjectInfoo={initialProjectInfo}
			/>

			<div>
				<div className={styles.section}></div>
			</div>
		</>
	);
}

export default create;
