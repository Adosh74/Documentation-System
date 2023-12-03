"use client";
import React, { useState } from "react";
import styles from "./Styles.module.css";

interface ProjectInfo {
  introduction: string;
  purposeOfSoftwareBeingDeveloped: string;
  intendedAudience: string;
  overallDescriptionOfTheSoftware: string;
  systemFeaturesAndRequirements: string;
}


const SRS: React.FC = () => {
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

  const [browserImage, setBrowserImage] = useState<string>("");

  const initialProjectInfo: ProjectInfo = {
    introduction: "",
    purposeOfSoftwareBeingDeveloped: "",
    intendedAudience: "",
    overallDescriptionOfTheSoftware: "",
    systemFeaturesAndRequirements: "",
  };

  const [projectInfo, setProjectInfo] =
    useState<ProjectInfo>(initialProjectInfo);

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
    setProjectInfo((prevProjectInfo) => ({
      ...prevProjectInfo,
      browserImage,
    }));
    if (
      !browserImage ||
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

    setSuccessMessage("saved successfully!");
    setErrorMessage("");
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SRS;
