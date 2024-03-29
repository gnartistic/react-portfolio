import React from 'react';
import './index.scss';

const ProjectCard = ( { title, description, imageUrl, repoLink, liveLink } ) => (
    <div className="project-card">
        <div className="image-container">
            <img src={imageUrl} alt={title} />
        </div>
        <div className="project-info">
            <h3>{title}</h3>
            <div className="links">
            </div>
        </div>
    </div>
);

export default ProjectCard
