// ContentCardList.tsx
import Link from 'next/link';
import React from 'react';
import styles from './Styles.module.css';

interface ContentCard {
	id: string;
	title: string;
	startDate: string;
	endDate: string;
}

interface ContentCardListProps {
	cards: ContentCard[];
}

const Projects: React.FC<ContentCardListProps> = ({ cards }) => {
	return (
		<div>
			<h2 className={styles.title}>PROJECTS</h2>
			<section className={styles.content}>
				{cards.map((card, index) => (
					<div className={styles.projectCard} key={index}>
						<h2 className={styles.projectTitle}>{card.title}</h2>
						{card && card.id && (
							<Link href={`/sdlc?projectId=${card.id}`}>
								<button className={styles.viewProject}>
									view Project
								</button>
							</Link>
						)}

						<p className={styles.date}>Start Date: {card.startDate}</p>
						<p className={styles.date}>End Date: {card.endDate}</p>
					</div>
				))}
			</section>
		</div>
	);
};

export default Projects;
