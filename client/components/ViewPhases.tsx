"use client"
import SDLC from "./SDLC";
import { useState } from "react";

interface Info{
  ProjectInfo:{};
}

 const ViewPhases:React.FC<Info> = ({ProjectInfo})=> {
 const [showInfo,setShowInfo]=useState<boolean>(false);
  if(ProjectInfo == null){
    setShowInfo(true);
  }
  return (
    <>
      {true &&<SDLC InitiationProjectInfo={ProjectInfo} SRSProjectInfo={undefined} SDDProjectInfo={undefined}/>}
    </>
  );
}

export default ViewPhases;

