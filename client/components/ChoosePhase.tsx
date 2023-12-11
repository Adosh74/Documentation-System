import React, { useState } from 'react';
import Initiation from './Initiation';
import ItemList from './ItemList';
import SDD from './SDD';
import SRS from './SRS';
import styles from './Styles.module.css';

const initialProjectInfo = {
	title: '',
	startDate: null,
	finishDate: null,
	objectives: '',
	projectManager: '',
	budget: '',
	scopeStatements: '',
};
const SRSProjectInfo = {
	introduction: '',
	purposeOfSoftwareBeingDeveloped: '',
	intendedAudience: '',
	overallDescriptionOfTheSoftware: '',
	systemFeaturesAndRequirements: '',
	browserImage: '',
};
interface sdd {
	id: number;
	file: string;
	fileName: string;
}

const SDDProjectInfo: sdd[] = [];

interface ChoosePhase {
	project_Id: string;
}

const ChoosePhase: React.FC<ChoosePhase> = ({ project_Id }) => {
	const [projectId, setProjectId] = useState<string>(project_Id);

	const [componentInitiationDataSaved, setcomponentInitiationDataSaved] =
		useState<boolean>(false);

	const handleSaveComponentInitiation = () => {
		setcomponentInitiationDataSaved(true);
	};

	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	const items = ['Initiation Phase', 'Requirements Phase (SRS)', 'Design Phase (SDD)'];

	const handleSelect = (item: string | null) => {
		setSelectedItem(item);
	};

	return (
		<div>
			<header className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container">
					<a
						style={{
							fontSize: '1.2em',
							fontWeight: '900',
							color: 'silver',
							marginLeft: '55px',
							marginBottom: '40px',
						}}
					>
						SDLC Phase
					</a>
					<div>
						<ItemList items={items} onSelect={handleSelect} />
						{selectedItem && (
							<p
								style={{
									fontSize: '100',
									fontWeight: '900',
									color: 'olive',
									marginLeft: '50px',
								}}
							>
								Selected: {selectedItem}
							</p>
						)}
					</div>
				</div>
			</header>
			<div>
				{selectedItem === 'Initiation Phase' && (
					<Initiation
						onSave={handleSaveComponentInitiation}
						initialProjectInfoo={initialProjectInfo}
					/>
				)}
				{selectedItem === 'Requirements Phase (SRS)' && (
					<div>
						{componentInitiationDataSaved ? (
							<SRS
								onSave={handleSaveComponentInitiation}
								initialProjectInfoo={SRSProjectInfo}
								projectId={projectId}
							/>
						) : (
							<p className={styles.error}>
								Please fill out the Initiation phase content first
							</p>
						)}
					</div>
				)}
				{selectedItem === 'Design Phase (SDD)' && (
					<div>
						{componentInitiationDataSaved ? (
							<SDD
								onSave={handleSaveComponentInitiation}
								initialProjectInfoo={SDDProjectInfo}
							/>
						) : (
							<p className={styles.error}>
								Please fill out the Initiation phase content first
							</p>
						)}
					</div>
				)}{' '}
			</div>
		</div>
	);
};

export default ChoosePhase;
