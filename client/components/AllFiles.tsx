import React from "react";

interface Document {
  id: number;
  file: string;
  fileName: string;
}

interface AllFilesProps {
  files: Document[];
}

const AllFiles: React.FC<AllFilesProps> = ({ files }) => {
  return (
    <div>
      <h2>All Files</h2>
      {files.map((file) => (
        <div key={file.id}>
          <p>File Name: {file.fileName}</p>
          <p>File Content:</p>
          <img
            src={file.file}
            alt={`Preview for ${file.fileName}`}
            style={{ maxWidth: "100%" }}
          />
        </div>
      ))}
    </div>
  );
};

export default AllFiles;
