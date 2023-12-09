import React from "react";
import styles from "./Styles.module.css";

interface Document {
  id: number;
  file: string;
  fileName: string;
}


interface AllFilesProps {
  files: Document[];
  useCase:string;
}

const AllFiles: React.FC<AllFilesProps> = ({ files ,useCase}) => {

 
  return (
    <div style={{backgroundColor:"white",border: "4px solid #ddd",borderRadius: "10px"}}>
      <h1  style={{color:"white",backgroundColor:"#3c3b3b",borderRadius: "10px"}} >All Files</h1>
      {useCase ?(
        <div  style={{border: "4px solid #ddd", borderRadius: "10px"}}>
          <h5>File Name </h5><p style={{color:"GrayText"}}>UseCase</p>
          <h5>File Content</h5>
          <img
            src={useCase}
            alt={`Preview for UseCase`}
            className={styles.images}
          />
        </div>
      ):(
        <></>
      )}
      
      <div>
        {files.map((file) => (
        <div key={file.id} style={{border: "4px solid #ddd", borderRadius: "10px"}}>
          <h5>File Name </h5><p style={{color:"GrayText"}}>{file.fileName}</p>
          <h5>File Content</h5>
          <img
            src={file.file}
            alt={`Preview for ${file.fileName}`}
            className={styles.images}
          />
        </div>
      ))}
      </div>
        
    </div>
  );
};

export default AllFiles;
