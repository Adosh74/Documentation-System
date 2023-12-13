'use client';

import { useState } from 'react';
import SDLC from './SDLC';

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

const ViewPhases: React.FC<Info> = ({
	InitiationProjectInfo,
	SRSProjectInfo,
	SDDProjectInfo,
}) => {
	return (
		<>
			<SDLC
				InitiationProjectInfo={InitiationProjectInfo}
				SRSProjectInfo={SRSProjectInfo}
				SDDProjectInfo={SDDProjectInfo}
			/>
		</>
	);
};

export default ViewPhases;
