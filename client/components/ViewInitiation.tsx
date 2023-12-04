import React from "react";


interface ViewInitiationProps {
  projectInfo: {
    title: string;
    startDate: string;
    finishDate: string;
    objectives: string;
    projectManager: string;
    budget: string;
    scopeStatements: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const ViewInitiation: React.FC<ViewInitiationProps> = ({
  projectInfo,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <h2>Initiation Phase</h2>
      <h5>Title: </h5><p>{projectInfo.title}</p>
      <h5>Start Date: </h5><p>{projectInfo.startDate}</p>
      <h5>Finish Date: </h5><p>{projectInfo.finishDate}</p>
      <h5>Objectives: </h5><p>{projectInfo.objectives}</p>
      <h5>Project Manager: </h5><p>{projectInfo.projectManager}</p>
      <h5>Budget: </h5><p>{projectInfo.budget}</p>
      <h5>Scope Statements:</h5><p>{projectInfo.scopeStatements}</p>
       <br/>
        <div style={{textAlign:"center"}}>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
    </div>
  );
};

export default ViewInitiation;
