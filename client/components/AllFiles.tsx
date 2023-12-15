import React from 'react';
import styles from './Styles.module.css';

interface AllFilesProps {
	files: string[];
}

const AllFiles: React.FC<AllFilesProps> = ({ files }) => {
	return (
		<div
			style={{
				backgroundColor: 'white',
				border: '4px solid #ddd',
				borderRadius: '10px',
			}}
		>
			<h1
				style={{
					color: 'white',
					backgroundColor: '#3c3b3b',
					borderRadius: '10px',
				}}
			>
				All Files
			</h1>

			<div>
				{files.map((file, i) => (
					<div
						key={i}
						style={{ border: '4px solid #ddd', borderRadius: '10px' }}
					>
						<h5>File Name </h5>
						<p style={{ color: 'GrayText' }}>{file}</p>
						<h5>File Content</h5>
						<img
							src={`http://localhost:3001/images/${file}`}
							alt={`Preview for ${file}`}
							className={styles.images}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllFiles;
