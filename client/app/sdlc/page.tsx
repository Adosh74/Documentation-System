"use client"
import Header from "@/components/Header";
import ViewPhases from "@/components/ViewPhases";
import styles from "./page.module.css"
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


 const Sdlc:React.FC<Info> = ({  InitiationProjectInfo,SRSProjectInfo,SDDProjectInfo})=> {
  const [projectInfo1, setProjectInfo1] = useState<any>({InitiationProjectInfo});
  const [projectInfo2, setProjectInfo2] = useState<any>({SRSProjectInfo});
  const [projectInfo3, setProjectInfo3] = useState<any>({SDDProjectInfo});
 
  return (
       <div className={styles.body}>
      <Header/>
      <ViewPhases InitiationProjectInfo={projectInfo1} SRSProjectInfo={projectInfo2} SDDProjectInfo={projectInfo3}/>
         </div>
  );
}

export default Sdlc;

