'use client';

import ViewInitiation from '@/components/ViewInitiation';
import React, { useState } from 'react';
import styles from './Styles.module.css';
import UpdateInitiation from './UpdateInitiation';
import UpdateSDD from './UpdateSDD';
import UpdateSRS from './UpdateSRS';
import ViewSDD from './ViewSDD';
import ViewSRS from './ViewSRS';

interface initiation {
	id: string;
	title?: string;
	startIn?: Date;
	endIn?: Date;
	objectives?: string;
	project_manager?: string;
	budget?: number;
	scope?: string;
}
interface srs {
	introduction: string;
	purposeOfSoftwareBeingDeveloped: string;
	intendedAudience: string;
	overallDescriptionOfTheSoftware: string;
	systemFeaturesAndRequirements: string;
	browserImage: string;
}

interface sdd {
	id: number;
	file: string;
	fileName: string;
}

interface Info {
	InitiationProjectInfo: initiation;
	SRSProjectInfo: srs;
	SDDProjectInfo: sdd[];
}

const SDLC: React.FC<Info> = ({
	InitiationProjectInfo,
	SRSProjectInfo,
	SDDProjectInfo,
}) => {
	const [projectInfo1, setProjectInfo1] = useState<any>(InitiationProjectInfo);
	const [projectInfo2, setProjectInfo2] = useState<any>(SRSProjectInfo);
	const [projectInfo3, setProjectInfo3] = useState<any>(SDDProjectInfo);

	const [isEditing1, setIsEditing1] = useState<boolean>(false);
	const [isEditing2, setIsEditing2] = useState<boolean>(false);
	const [isEditing3, setIsEditing3] = useState<boolean>(false);

	const handleSave1 = (updatedInfo: any) => {
		setProjectInfo1(updatedInfo);
		setIsEditing1(false);
	};
	const handleEdit1 = () => {
		setIsEditing1(true);
	};
	const handleDelete1 = () => {
		setProjectInfo1(null);
	};

	const handleSave2 = (updatedInfo: any) => {
		setProjectInfo2(updatedInfo);
		setIsEditing2(false);
	};
	const handleEdit2 = () => {
		setIsEditing2(true);
	};
	const handleDelete2 = () => {
		setProjectInfo2(null);
	};

	const handleSave3 = (updatedInfo: any) => {
		setProjectInfo3(updatedInfo);
		setIsEditing3(false);
	};
	const handleEdit3 = () => {
		setIsEditing3(true);
	};
	const handleDelete3 = () => {
		setProjectInfo3(null);
	};

	return (
		<div className={styles.view}>
			<div>
				{isEditing1 ? (
					<UpdateInitiation
						onSave={handleSave1}
						initialProjectInfoo={projectInfo1}
					/>
				) : (
					projectInfo1 && (
						<ViewInitiation
							projectInfo={projectInfo1}
							onEdit={handleEdit1}
							onDelete={handleDelete1}
						/>
					)
				)}
			</div>
			<div>
				{isEditing2 ? (
					<UpdateSRS
						onSave={handleSave2}
						initialProjectInfoo={projectInfo2}
						projectId={''}
					/>
				) : (
					projectInfo2 && (
						<ViewSRS
							projectInfo={projectInfo2}
							onEdit={handleEdit2}
							onDelete={handleDelete2}
						/>
					)
				)}
			</div>
			<div style={{ marginBottom: '0em' }}>
				{isEditing3 ? (
					<UpdateSDD
						onSave={handleSave3}
						initialProjectInfoo={projectInfo3}
						projectId={''}
					/>
				) : (
					projectInfo3 && (
						<ViewSDD
							projectInfo={projectInfo3}
							onEdit={handleEdit3}
							onDelete={handleDelete3}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default SDLC;
