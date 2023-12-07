"use client"
import SDLC from "./SDLC";
import { useState } from "react";


interface initiation {
  title: string;
  startDate: string;
  finishDate: string;
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
  InitiationProjectInfo:initiation|undefined;
  SRSProjectInfo:srs|undefined;
  SDDProjectInfo: sdd[]|undefined;
}


 const ViewPhases:React.FC<Info> = ({InitiationProjectInfo ,SRSProjectInfo,SDDProjectInfo})=> {
  
  return (
    <>
      <SDLC InitiationProjectInfo={undefined} SRSProjectInfo={undefined} SDDProjectInfo={undefined}/>
    </>
  );
}

export default ViewPhases;

