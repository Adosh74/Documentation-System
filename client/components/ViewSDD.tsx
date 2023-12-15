import { Isdd } from '@/app/sdlc/page';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import CreateSdd, { Document } from './SDD';
import styles from './Styles.module.css';

interface ViewSDDProps {
	projectInfo?: Isdd;
	onEdit: () => void;
	onDelete: () => void;
}

const SDD: React.FC<ViewSDDProps> = ({ projectInfo, onEdit, onDelete }) => {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [openSdd, setopenSdd] = useState(false);

	const handleDeleteConfirmation = () => {
		setShowConfirmation(true);
	};
	const params = useSearchParams();
	// aa
	const SddProjectInfo: Document[] = [
		{
			id: 0,
			file: '',
			fileName: '',
		},
	];

	const handleDelete = () => {
		onDelete();
		setShowConfirmation(false);
	};

	const openCreateSdd = () => {
		setopenSdd(true);
	};

	if (!projectInfo || projectInfo?.id === '') {
		return (
			<div>
				<h2>There is no SDD Phase</h2>
				<button
					style={{ backgroundColor: 'AppWorkspace' }}
					onClick={openCreateSdd}
				>
					Create
				</button>
				{openSdd && (
					<CreateSdd
						onSave={() => {
							return;
						}}
						initialProjectInfoo={SddProjectInfo}
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
							paddingLeft: '33em',
						}}
					>
						<h2>SDD Phase</h2>
					</div>
				</div>

				{projectInfo && projectInfo.uml ? (
					projectInfo.uml.map((file, i) => (
						<div key={i}>
							<h5>File {i + 1} </h5>
							<p className={styles.paragraph}>UML Diagrams</p>
							<h5>File Content :</h5>
							<img
								src={`http://localhost:3001/images/${file}`}
								alt={`Preview for ${file}`}
								style={{ maxWidth: '100%' }}
							/>
						</div>
					))
				) : (
					<>
						<h5>File Name : </h5>
						<h5>File Content :</h5>
					</>
				)}
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
							Are you sure you want to delete SDD Phase?
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

export default SDD;
