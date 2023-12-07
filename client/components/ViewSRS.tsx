import React, { useState } from "react";


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
    const [browserImage, setBrowserImage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Read the selected file and set it to the state
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrowserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div style={{backgroundColor:"ButtonHighlight",paddingLeft:"29em"}}>
      <h2>SRS Phase</h2>
    </div>
      <h5>Introduction: </h5><p>{projectInfo.introduction}</p>
      <h5>Purpose Of Software Being Developed: </h5><p>{projectInfo.purposeOfSoftwareBeingDeveloped}</p>
      <h5>Intended Audience: </h5><p>{projectInfo.intendedAudience}</p>
      <h5>Overall Description Of The Software: </h5><p>{projectInfo.overallDescriptionOfTheSoftware}</p>
      <h5>System Features and Requirements: </h5><p>{projectInfo.systemFeaturesAndRequirements}</p>
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
      
      <div style={{textAlign:"center"}}>
      <button onClick={onEdit}>Edit</button>
      <button  style={{backgroundColor:"red"}} onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default SRS;
