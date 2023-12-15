import { Isrs } from '@/app/sdlc/page';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import CreateSRS from './SRS';
import styles from './Styles.module.css';

interface ViewSRSProps {
	projectInfo: Isrs;
	onEdit: () => void;
	onDelete: () => void;
}
const SRSProjectInfo = {
	introduction: '',
	purposeOfSoftwareBeingDeveloped: '',
	intendedAudience: '',
	overallDescriptionOfTheSoftware: '',
	systemFeaturesAndRequirements: '',
	browserImage: '',
};

const SRS: React.FC<ViewSRSProps> = ({ projectInfo, onEdit, onDelete }) => {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
		}
	};
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [openSrs, setopenSrs] = useState(false);

	// get the params
	const params = useSearchParams();

	const handleDeleteConfirmation = () => {
		setShowConfirmation(true);
	};

	const handleDelete = () => {
		onDelete();
		setShowConfirmation(false);
	};
	const openCreateSrs = () => {
		setopenSrs(true);
	};

	if (!projectInfo || projectInfo.id === '') {
		return (
			<div>
				<h2>There is no SRS Phase</h2>
				<button
					style={{ backgroundColor: 'AppWorkspace' }}
					onClick={openCreateSrs}
				>
					Create
				</button>
				{openSrs && (
					<CreateSRS
						onSave={() => {
							return;
						}}
						initialProjectInfoo={SRSProjectInfo}
						projectId={params.get('projectId')}
					/>
				)}
			</div>
		);
	}

	return (
		<div>
			<div className={styles.view}>
				<div style={{ borderRadius: '10px' }}>
					<div
						className={styles.view}
						style={{
							backgroundColor: 'ButtonHighlight',
							paddingLeft: '32em',
						}}
					>
						<h2>SRS Phase</h2>
					</div>
				</div>
				<h5>Introduction: </h5>
				<p className={styles.paragraph}>{projectInfo.intro}</p>
				<h5>Purpose Of Software Being Developed: </h5>
				<p className={styles.paragraph}>{projectInfo.purpose}</p>
				<h5>Intended Audience: </h5>
				<p className={styles.paragraph}>{projectInfo.intended_audience}</p>
				<h5>Overall Description Of The Software: </h5>
				<p className={styles.paragraph}>{projectInfo.description}</p>
				<h5>System Features and Requirements: </h5>
				<p className={styles.paragraph}>{projectInfo.requirements}</p>
				<h5>
					UseCase:
					{true && (
						<div onChange={handleFileChange}>
							<img
								src={`http://localhost:3001/images/${projectInfo.use_case}`}
								style={{ maxWidth: '100%' }}
							/>
						</div>
					)}
				</h5>

				<div style={{ textAlign: 'center', margin: '5em' }}>
					<button
						style={{ backgroundSize: 'auto', backgroundColor: '#29282a' }}
						onClick={onEdit}
					>
						Edit
					</button>
					<button
						style={{ backgroundColor: 'red' }}
						onClick={handleDeleteConfirmation}
					>
						Delete
					</button>
				</div>

				{showConfirmation && (
					<div
						style={{
							textAlign: 'center',
							border: '4px solid #0d4d64',
							borderRadius: '50px',
							padding: '10px',
							backgroundColor: 'snow',
						}}
					>
						<p style={{ marginLeft: '4em', color: '#0d4d64' }}>
							Are you sure you want to delete SRS Phase?
						</p>
						<button
							style={{ backgroundColor: '#0d4d64' }}
							onClick={handleDelete}
						>
							Yes
						</button>
						<button
							style={{ backgroundColor: '#0d4d64' }}
							onClick={() => setShowConfirmation(false)}
						>
							No
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default SRS;
