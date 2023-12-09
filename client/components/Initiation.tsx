"use client";
import React, { useEffect, useState } from "react";
import styles from "./Styles.module.css";
import Link from "next/link";

interface ProjectInfo {
  title: string;
  startDate: string;
  finishDate: string;
  objectives: string;
  projectManager: string;
  budget: string;
  scopeStatements: string;
}

interface InitiationProps {
   onSave: (updatedInfo: ProjectInfo) => void;
    initialProjectInfoo: ProjectInfo| undefined; 
}
     

const Initiation: React.FC<InitiationProps> = ({ onSave ,initialProjectInfoo}) => {
  const [dataSaved, setDataSaved] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>();

    const initialProjectInfo: ProjectInfo = initialProjectInfoo || {
    title: "",
    startDate: "",
    finishDate: "",
    objectives: "",
    projectManager: "",
    budget: "",
    scopeStatements: "",
  };

  const [projectInfo, setProjectInfo] =
    useState<ProjectInfo>(initialProjectInfo);

     useEffect(() => {
    if (initialProjectInfoo) {
      setProjectInfo(initialProjectInfoo);
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
    setSuccessMessage("");
    setErrorMessage("");
    setSelectedDate("");
  };
  const handleSave = () => {
    if (
      !projectInfo.title ||
      !projectInfo.startDate ||
      !projectInfo.finishDate ||
      !projectInfo.objectives ||
      !projectInfo.projectManager ||
      !projectInfo.budget ||
      !projectInfo.scopeStatements
    ) {
      setErrorMessage("Please complete all required fields.");
      return;
    }
    console.log("Project information saved:", projectInfo);
    
    setSuccessMessage("saved successfully!");
    setErrorMessage("");
    onSave(projectInfo);
    setDataSaved(true);
  };

  return (
    <div>
    <div className={styles.phaseBody}>
      <div className="p-5 text-center bg-image">
        <div className={styles.container}>
          <h2>Initiation Phase</h2>
          <label>
            Project Title
            <input
              type="text"
              value={projectInfo.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </label>

          <label htmlFor="startDatePicker">
            Project Start Date
            <input
              type="date"
              id="datePicker"
              value={selectedDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
            />
          </label>

          <label htmlFor="finishDatePicker">
            Project Finish Date
            <input
              type="date"
              id="datePicker"
              value={selectedDate}
              onChange={(e) => handleInputChange("finishDate", e.target.value)}
            />
          </label>
          <label>
            Project Objectives
            <textarea
              value={projectInfo.objectives}
              onChange={(e) => handleInputChange("objectives", e.target.value)}
            />
          </label>
          <label>
            Project Manager
            <input
              type="text"
              value={projectInfo.projectManager}
              onChange={(e) =>
                handleInputChange("projectManager", e.target.value)
              }
            />
          </label>
          <label>
            Budget Information
            <input
              type="text"
              value={projectInfo.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
            />
          </label>
          <label>
            Project Scope Statements
            <textarea
              value={projectInfo.scopeStatements}
              onChange={(e) =>
                handleInputChange("scopeStatements", e.target.value)
              }
            />
          </label>
          <div>
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

export default Initiation;
