import React, { useState } from "react";
import styles from "./Styles.module.css";


interface ViewSRSProps {
  projectInfo: {
      introduction: string;
  purposeOfSoftwareBeingDeveloped: string;
  intendedAudience: string;
  overallDescriptionOfTheSoftware: string;
  systemFeaturesAndRequirements: string;
  browserImage:string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const SRS: React.FC<ViewSRSProps> = ({
  projectInfo,
  onEdit,
  onDelete,
}) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };
   const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleDelete = () => {
    onDelete();
    setShowConfirmation(false); 
  };

  return (
    <div>
        <div  className={styles.view}>
       <div style={{borderRadius:"10px"}}>  
  <div className={styles.view} style={{backgroundColor:"ButtonHighlight",paddingLeft:"32em"}}>

       <h2>SRS Phase</h2>
    </div>

    </div>
      <h5>Introduction: </h5><p className={styles.paragraph}>{projectInfo.introduction}</p>
      <h5>Purpose Of Software Being Developed: </h5><p className={styles.paragraph}>{projectInfo.purposeOfSoftwareBeingDeveloped}</p>
      <h5>Intended Audience: </h5><p className={styles.paragraph}>{projectInfo.intendedAudience}</p>
      <h5>Overall Description Of The Software: </h5><p className={styles.paragraph}>{projectInfo.overallDescriptionOfTheSoftware}</p>
      <h5>System Features and Requirements: </h5><p className={styles.paragraph}>{projectInfo.systemFeaturesAndRequirements}</p>
      <h5>UseCase: 
               {true && (
              <div onChange={handleFileChange}>
                <img
                  src={projectInfo.browserImage}
                  
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
              </h5>
      
      <div style={{textAlign:"center" ,margin:"5em"}}>
          <button style={{ backgroundSize: "auto",backgroundColor: "#29282a"}}  onClick={onEdit}>Edit</button>
          <button style={{backgroundColor:"red"}}  onClick={handleDeleteConfirmation}>Delete</button>
        </div>

               {showConfirmation && (
          <div style={{ textAlign: "center", border: "4px solid #0d4d64",borderRadius:"50px",padding:"10px",backgroundColor:"snow"}}>
            <p style={{marginLeft: "4em" ,color:"#0d4d64"}}>Are you sure you want to delete SRS Phase?</p>
            <button style={{backgroundColor:"#0d4d64"}} onClick={handleDelete}>Yes</button>
            <button style={{backgroundColor:"#0d4d64"}} onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SRS;
