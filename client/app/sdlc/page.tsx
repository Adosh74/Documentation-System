"use client"
import Header from "@/components/Header";
import ViewPhases from "@/components/ViewPhases";
import styles from "./page.module.css"
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

//        Example Data

const  InitiationProjectInfo: initiation = {
    title: "Initial Title",
    startDate: new Date("2023-12-03"),
    finishDate: new Date("2023-12-20"),
    objectives: "Initial Objectives",
    projectManager: "Initial Project Manager",
    budget: "Initial Budget",
    scopeStatements: "Initial Scope Statements",
  };
  const formattedInitiationProjectInfo = {
  ...InitiationProjectInfo,
  startDate: InitiationProjectInfo.startDate
  ? InitiationProjectInfo.startDate.toISOString().split("T")[0]
  : "",
  finishDate:  InitiationProjectInfo.finishDate
  ? InitiationProjectInfo.finishDate.toISOString().split("T")[0]
  : "",
};

const SRSProjectInfo: srs = {
    introduction: "Hello",
    purposeOfSoftwareBeingDeveloped: "purposeOfSoftwareBeingDeveloped",
    intendedAudience: "intendedAudience",
    overallDescriptionOfTheSoftware: "overallDescriptionOfTheSoftware",
    systemFeaturesAndRequirements: "systemFeaturesAndRequirements",
    browserImage:"../icon.png"
  };

const SDDProjectInfo : sdd[] =[{id:1,file:"../icon.png",fileName:"Database Design"},
 {id:2,file:"../icon.png",fileName:"UML Diagrams"}];
 
//* /////////////////////////////////////////////////////////////////////// */
 
 const Sdlc:React.FC = ()=> {
  const [projectInfo1, setProjectInfo1] = useState<any>(formattedInitiationProjectInfo );
  const [projectInfo2, setProjectInfo2] = useState<any>(SRSProjectInfo);
  const [projectInfo3, setProjectInfo3] = useState<any>(SDDProjectInfo);
  
  return (
       <div className={styles.body}>
      <Header/>
      <ViewPhases InitiationProjectInfo={projectInfo1} SRSProjectInfo={projectInfo2} SDDProjectInfo={projectInfo3}/>
         </div>
  );
}

export default Sdlc;

