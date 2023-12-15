import { Iinitiation } from '@/app/sdlc/page';
import React, { useState } from 'react';
import styles from './Styles.module.css';

interface ViewInitiationProps {
	projectInfo: Iinitiation;
	onEdit: () => void;
	onDelete: () => void;
}

const ViewInitiation: React.FC<ViewInitiationProps> = ({
	projectInfo,
	onEdit,
	onDelete,
}) => {
	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleDeleteConfirmation = () => {
		setShowConfirmation(true);
	};

	const handleDelete = () => {
		onDelete();
		setShowConfirmation(false);
	};

	return (
		<div>
			<div className={styles.view}>
				<div style={{ borderRadius: '10px' }}>
					<div
						className={styles.view}
						style={{
							backgroundColor: 'ButtonHighlight',
							paddingLeft: '29em',
						}}
					>
						<h2>Initiation Phase</h2>
					</div>
				</div>
				<h5>Title: </h5>
				<p className={styles.paragraph}>{projectInfo.title}</p>
				<h5>Start Date: </h5>
				<p className={styles.paragraph}>{projectInfo.startIn}</p>
				<h5>Finish Date: </h5>
				<p className={styles.paragraph}>{projectInfo.endIn}</p>
				<h5>Objectives: </h5>
				<p className={styles.paragraph}>{projectInfo.objectives}</p>
				<h5>Project Manager: </h5>
				<p className={styles.paragraph}>{projectInfo.project_manager}</p>
				<h5>Budget: </h5>
				<p className={styles.paragraph}>{projectInfo.budget}</p>
				<h5>Scope Statements:</h5>
				<p className={styles.paragraph}>{projectInfo.scope}</p>
				<br />
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
							Are you sure you want to delete Initiation Phase?
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

export default ViewInitiation;
