'use client';

import { Iinitiation, Isdd, Isrs } from '@/app/sdlc/page';
import { useState } from 'react';
import SDLC from './SDLC';

interface Info {
	InitiationProjectInfoData: Iinitiation;
	SRSProjectInfoData: Isrs;
	SDDProjectInfoData: Isdd;
}

const ViewPhases: React.FC<Info> = ({
	InitiationProjectInfoData,
	SRSProjectInfoData,
	SDDProjectInfoData,
}) => {
	return (
		<>
			<SDLC
				InitiationProjectInfo={InitiationProjectInfoData}
				SRSProjectInfo={SRSProjectInfoData}
				SDDProjectInfo={SDDProjectInfoData}
			/>
		</>
	);
};

export default ViewPhases;
