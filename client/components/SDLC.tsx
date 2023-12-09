"use client"
import ViewInitiation from "@/components/ViewInitiation";
import React, { useState } from "react";
import Initiation from "@/components/Initiation";
import styles from "./Styles.module.css";
import ViewSRS from "./ViewSRS";
import SRS from "./SRS";
import SDD from "./SDD";
import ViewSDD from "./ViewSDD";

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



 const SDLC:React.FC<Info> = ({InitiationProjectInfo ,SRSProjectInfo,SDDProjectInfo})=> {

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
          <div >
      {isEditing1 ? (
        <Initiation onSave={handleSave1} initialProjectInfoo={projectInfo1} />
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
     <div >
      {isEditing2 ? (
        <SRS onSave={handleSave2} initialProjectInfoo={projectInfo2} />
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
     <div style={{marginBottom:"0em"}}>
      {isEditing3 ? (
        <SDD onSave={handleSave3} initialProjectInfoo={projectInfo3} />
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
}

export default SDLC;

