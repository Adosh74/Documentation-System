import React, { useState } from "react";
import Link from "next/link";
import styles from "./Styles.module.css";
import ItemList from "./ItemList";
import Initiation from "./Initiation";
import SRS from "./SRS";
import SDD from "./SDD";

const initialProjectInfo = {
    title: "",
    startDate: "",
    finishDate: "",
    objectives: "",
    projectManager: "",
    budget: "",
    scopeStatements: "",
  };
  const SRSProjectInfo= {
    introduction: "",
    purposeOfSoftwareBeingDeveloped: "",
    intendedAudience: "",
    overallDescriptionOfTheSoftware: "",
    systemFeaturesAndRequirements: "",
    browserImage:"",
  };
const SDDProjectInfo={
id: 0,
  file: "",
  fileName: "",
}
const ChoosePhase: React.FC = () => {
  const [componentInitiationDataSaved, setcomponentInitiationDataSaved] =
    useState<boolean>(false);

  const handleSaveComponentInitiation = () => {
    setcomponentInitiationDataSaved(true);
  };

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const items = [
    "Initiation Phase",
    "Requirements Phase (SRS)",
    "Design Phase (SDD)",
  ];

  const handleSelect = (item: string | null) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <header className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a
            style={{
              fontSize: "1.2em",
              fontWeight: "900",
              color: "silver",
              marginLeft: "55px",
              marginBottom: "40px",
            }}
          >
            SDLC Phase
          </a>
          <div>
            <ItemList items={items} onSelect={handleSelect} />
            {selectedItem && (
              <p
                style={{
                  fontSize: "100",
                  fontWeight: "900",
                  color: "olive",
                  marginLeft: "50px",
                }}
              >
                Selected: {selectedItem}
              </p>
            )}
          </div>
        </div>
      </header>
      <div>
        {selectedItem === "Initiation Phase" && (
          <Initiation onSave={handleSaveComponentInitiation} initialProjectInfoo={initialProjectInfo} />
        )}
        {selectedItem === "Requirements Phase (SRS)" && (
          <div>
            {componentInitiationDataSaved ? (
              <SRS onSave={handleSaveComponentInitiation} initialProjectInfoo={SRSProjectInfo}/>
            ) : (
              <p className={styles.error}>
                Please fill out the Initiation phase content first
              </p>
            )}
          </div>
        )}
        {selectedItem === "Design Phase (SDD)" && (
          <div>
            {componentInitiationDataSaved ? (
              <SDD onSave={handleSaveComponentInitiation} initialProjectInfoo={SDDProjectInfo}  />
            ) : (
              <p className={styles.error}>
                Please fill out the Initiation phase content first
              </p>
            )}
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default ChoosePhase;
