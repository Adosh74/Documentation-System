import React from "react";


interface ViewSDDProps {
  projectInfo: {
    id: number;
  file: string;
  fileName: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const SDD: React.FC<ViewSDDProps> = ({
  projectInfo,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <h2>SDD Phase</h2>
      <h5>File Name: </h5><p>{projectInfo.fileName}</p>
      <h5>Browser Image:</h5>
      {projectInfo.file && (
                  <div>
                    <p>File Preview</p>
                    <img
                      src={projectInfo.file}
                      alt={`Preview for ${projectInfo.fileName}`}
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                )}
      
<div style={{textAlign:"center"}}>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default SDD
