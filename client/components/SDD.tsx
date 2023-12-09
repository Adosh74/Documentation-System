import React, { useEffect, useState } from "react";
import styles from "./Styles.module.css";
import Link from "next/link";


interface Document {
  id: number;
  file: string;
  fileName: string;
}
interface SRSProps {
    onSave: (updatedInfo: Document[]) => void;
     initialProjectInfoo?: Document[] | undefined;
}

const SDD: React.FC<SRSProps> = ({onSave,initialProjectInfoo}) => {
  const [dataSaved, setDataSaved] = useState<boolean>(false);
   const [documents, setDocuments] = useState<Document[]>(Array.isArray(initialProjectInfoo) ? initialProjectInfoo : []);
  const [newDocumentId, setNewDocumentId] = useState<number>( 1);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  
 useEffect(() => {
    if (Array.isArray(initialProjectInfoo)) {
      setDocuments(initialProjectInfoo);
      setNewDocumentId(initialProjectInfoo.length + 1);
    }
  }, [initialProjectInfoo]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedDocuments = documents.map((doc) =>
          doc.id === id ? { ...doc, file: reader.result as string } : doc
        );
        setDocuments(updatedDocuments);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewDocument = () => {
    const newDocument: Document = {
      id: newDocumentId,
      file: "",
      fileName: "",
    };
    setDocuments([...documents, newDocument]);
    setNewDocumentId(newDocumentId + 1);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSave = () => {
    if (documents.length === 0) {
      setErrorMessage("Please add new document");
      return;
    }

    if (documents.some((doc) => !doc.file || !doc.fileName)) {
      setErrorMessage(
        "Please provide both file and fileName for all documents."
      );
      return;
    }
    console.log("Saved SDD Information:", documents);
onSave(documents);
    setSuccessMessage("SDD information saved successfully!");
    setDataSaved(true);
    setErrorMessage("");
  };

  const handleReset = () => {
    setDocuments(Array.isArray(initialProjectInfoo) ? initialProjectInfoo : []);
    setNewDocumentId(1);

    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div>
      <div className={styles.phaseBody}>
        <div className="p-5 text-center bg-image">
          <div className={styles.container}>
            <h2>System Design Document (SDD)</h2>
            <h5 className={styles.prag}>
              Insert documents as Images <br />
              [UML Diagrams - Database Design - User Interface Design]
            </h5>
            {documents.map((doc) => (
              <div key={doc.id}>
                <label htmlFor={`fileNameInput-${doc.id}`}>File Name</label>
                <input
                  type="text"
                  id={`fileNameInput-${doc.id}`}
                  value={doc.fileName}
                  onChange={(e) =>
                    setDocuments((prevDocuments) =>
                      prevDocuments.map((prevDoc) =>
                        prevDoc.id === doc.id
                          ? { ...prevDoc, fileName: e.target.value }
                          : prevDoc
                      )
                    )
                  }
                />
                <label htmlFor={`fileInput-${doc.id}`}>Browser Image</label>
                <input
                  type="file"
                  id={`fileInput-${doc.id}`}
                  accept="*/*"
                  onChange={(e) => handleFileChange(e, doc.id)}
                />
                {doc.file && (
                  <div>
                    <p>File Preview</p>
                    <img
                      src={doc.file}
                      alt={`Preview for ${doc.fileName}`}
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                )}
              </div>
            ))}

            <a>
              {" "}
              <button onClick={handleAddNewDocument}>Add New Document</button>
            </a>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <div style={{ marginTop: "40px" }}>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleReset}>Reset</button>
            </div>
            {dataSaved && (
        <>
          <Link href="/sdlc">
            <button style={{ color: "red", backgroundColor: "yellow" }}>
              View Phase
            </button>
          </Link>
        </>
      )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SDD;
