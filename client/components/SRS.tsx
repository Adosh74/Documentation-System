"use client";
import React, { useEffect, useState } from "react";
import styles from "./Styles.module.css";
import SDLC from "./SDLC";
import Link from "next/link";

interface ProjectInfo {
  introduction: string;
  purposeOfSoftwareBeingDeveloped: string;
  intendedAudience: string;
  overallDescriptionOfTheSoftware: string;
  systemFeaturesAndRequirements: string;
  browserImage:string;
}

interface SRSProps {
   onSave: (updatedInfo: ProjectInfo) => void;
    initialProjectInfoo: ProjectInfo |undefined; 
}
const initialInfo = {
    title: "",
    startDate: "",
    finishDate: "",
    objectives: "",
    projectManager: "",
    budget: "",
    scopeStatements: "",
  };
     const sdd ={
    id: 0,
  file: "",
  fileName: ""
  };
  const sddInfo =[sdd];
  

const SRS: React.FC <SRSProps>= ({onSave ,initialProjectInfoo}) => {
  const [dataSaved, setDataSaved] = useState<boolean>(false);
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

  const initialProjectInfo: ProjectInfo = initialProjectInfoo || {
    introduction: "",
    purposeOfSoftwareBeingDeveloped: "",
    intendedAudience: "",
    overallDescriptionOfTheSoftware: "",
    systemFeaturesAndRequirements: "",
    browserImage:""
  };

  const [projectInfo, setProjectInfo] =
    useState<ProjectInfo>(initialProjectInfo);

         useEffect(() => {
    if (initialProjectInfoo) {
      setProjectInfo(initialProjectInfoo);
      setBrowserImage(initialProjectInfoo.browserImage);
    }
  }, [initialProjectInfoo]);

  const handleInputChange = (key: keyof ProjectInfo, value: string) => {
    setProjectInfo((prevInfo) => ({
      ...prevInfo,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setProjectInfo(initialProjectInfo);
    // Reset the SRS information to its initial state
    setProjectInfo((prevProjectInfo) => ({
      ...prevProjectInfo,
      browserImage: "",
      // Reset other SRS information in projectInfo as needed
    }));
    setBrowserImage("");
    setSuccessMessage("");
    setErrorMessage("");
  };
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const handleSave = () => {
  projectInfo.browserImage=browserImage;
    setProjectInfo((prevProjectInfo) => ({
      ...prevProjectInfo,
      browserImage,
    }));
    if (
      !projectInfo.browserImage ||
      !projectInfo.introduction ||
      !projectInfo.purposeOfSoftwareBeingDeveloped ||
      !projectInfo.intendedAudience ||
      !projectInfo.overallDescriptionOfTheSoftware ||
      !projectInfo.systemFeaturesAndRequirements
    ) {
      setErrorMessage("Please complete all required fields.");
      return;
    }
    
    console.log("Project information saved:", projectInfo);
    onSave(projectInfo);
    setSuccessMessage("saved successfully!");
    setErrorMessage("");
    setDataSaved(true);

  };

  return (
    <div>
      <div className={styles.phaseBody}>
        <div className="p-5 text-center bg-image">
          <div className={styles.container}>
            <h2>Requirements Phase (SRS)</h2>
            <label>
              Introduction
              <textarea
                value={projectInfo.introduction}
                onChange={(e) =>
                  handleInputChange("introduction", e.target.value)
                }
              />
            </label>
            <label>
              Purpose Of Software Being Developed
              <textarea
                value={projectInfo.purposeOfSoftwareBeingDeveloped}
                onChange={(e) =>
                  handleInputChange(
                    "purposeOfSoftwareBeingDeveloped",
                    e.target.value
                  )
                }
              />
            </label>
            <label>
              Intended Audience
              <textarea
                value={projectInfo.intendedAudience}
                onChange={(e) =>
                  handleInputChange("intendedAudience", e.target.value)
                }
              />
            </label>
            <label>
              Overall Description Of The Software
              <textarea
                value={projectInfo.overallDescriptionOfTheSoftware}
                onChange={(e) =>
                  handleInputChange(
                    "overallDescriptionOfTheSoftware",
                    e.target.value
                  )
                }
              />
            </label>
            <label>
              System Features and Requirements:
              <br />
              [1] Functional Requirement
              <br />
              [2] Non-functional Requirement
              <br />
              [3] External Interface Requirement
              <br />
              <textarea
                value={projectInfo.systemFeaturesAndRequirements}
                onChange={(e) =>
                  handleInputChange(
                    "systemFeaturesAndRequirements",
                    e.target.value
                  )
                }
              />
            </label>
            <div>
              <label htmlFor="fileInput">UseCase</label>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            {browserImage && (
              <div>
                <img
                  src={browserImage}
                  alt="Browser"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
            <div style={{ marginTop: "40px" }}>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
              <button onClick={handleSave}>Save</button>
              <button onClick={handleReset}>Reset</button>
            </div>
            {dataSaved&&<Link href="/sdlc" ><button style={{ color: "red",backgroundColor:"yellow" }}>view Phase</button></Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SRS;
