import React, { useState } from "react";
import styles from "./Styles.module.css";


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
   const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleDelete = () => {
    onDelete();
    setShowConfirmation(false); 
  };
  
   
  return (
    <div >
      
      <div  className={styles.view}>
       <div style={{borderRadius:"10px"}}>  
  <div className={styles.view} style={{backgroundColor:"ButtonHighlight",paddingLeft:"33em"}}>
      <h2>SDD Phase</h2>
      </div>
      </div>

      {Array.isArray(projectInfo) && projectInfo.length >= 0 ? (
      projectInfo.map((file) => (
        <div key={file.id}>
          <h5>File Name : </h5><p className={styles.paragraph}>{file.fileName}</p>
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
      <div style={{textAlign:"center" ,margin:"5em"}}>
          <button style={{ backgroundSize: "auto",backgroundColor: "#29282a"}}  onClick={onEdit}>Edit</button>
          <button style={{backgroundColor:"red"}}  onClick={handleDeleteConfirmation}>Delete</button>
        </div>

          {showConfirmation && (
          <div style={{ textAlign: "center", border: "4px solid #0d4d64",borderRadius:"50px",padding:"10px",backgroundColor:"snow"}}>
            <p style={{marginLeft: "4em" ,color:"#0d4d64"}}>Are you sure you want to delete SDD Phase?</p>
            <button style={{backgroundColor:"#0d4d64"}} onClick={handleDelete}>Yes</button>
            <button style={{backgroundColor:"#0d4d64"}} onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};


export default SDD
