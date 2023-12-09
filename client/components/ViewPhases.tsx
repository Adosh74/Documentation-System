"use client"
import SDLC from "./SDLC";
import { useState } from "react";


interface initiation {
  title: string;
  startDate: Date;
  finishDate: Date;
  objectives: string;
  projectManager: string;
  budget: string;
  scopeStatements: string;
}
interface srs {
  introduction: string;
  purposeOfSoftwareBeingDeveloped: string;
  intendedAudience: string;
  overallDescriptionOfTheSoftware: string;
  systemFeaturesAndRequirements: string;
  browserImage:string;
}

interface sdd {
  id: number;
  file: string;
  fileName: string;
}

interface Info{
  InitiationProjectInfo:initiation;
  SRSProjectInfo:srs;
  SDDProjectInfo: sdd[];
}


 const ViewPhases:React.FC<Info> = ({InitiationProjectInfo ,SRSProjectInfo,SDDProjectInfo})=> {
  
  return (
    <>
      <SDLC InitiationProjectInfo={InitiationProjectInfo} SRSProjectInfo={SRSProjectInfo} SDDProjectInfo={SDDProjectInfo}/>
    </>
  );
}

export default ViewPhases;

