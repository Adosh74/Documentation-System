import React from "react";
import AllFiles from "./AllFiles";

interface sdd {
  id: number;
  file: string;
  fileName: string;
}

interface ViewSDDProps {
  projectInfo: sdd[] | undefined;
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
      <div style={{backgroundColor:"ButtonHighlight",paddingLeft:"29em"}}>
      <h2>SDD Phase</h2>
      </div>

      {Array.isArray(projectInfo) && projectInfo.length >= 0 ? (
      projectInfo.map((file) => (
        <div key={file.id}>
          <h5>File Name : </h5><p>{file.fileName}</p>
          <h5>File Content :</h5>
          <img
            src={file.file}
            alt={`Preview for ${file.fileName}`}
            style={{ maxWidth: "100%" }}
          />
        </div>
      ))
        ) : (
          <>
            <h5>File Name : </h5>
            <h5>File Content :</h5>
          </>
        )}
      <div style={{ textAlign: "center" }}>
        <button onClick={onEdit}>Edit</button>
        <button style={{ backgroundColor: "red" }} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};


export default SDD
