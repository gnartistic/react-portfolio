// ProjectModal.js
import React from 'react';
import './index.scss';

const ProjectModal = ( { project, onClose } ) =>
{
    if( !project ) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal">
                <div className='content-container'>
                    <div className='title'>
                        <h3>{project.title}</h3>
                    </div>
                    <div className='img-container'>
                        <img src={project.imageUrl} alt='project preview'/>
                    </div>
                    <p>{project.description}</p>
                    <div className="button-container">
                        <div className='repo'>
                            <a href={project.repoLink} target="_blank" rel="noopener noreferrer">GitHub Repo</a>
                        </div>
                        <div className='demo'>
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
