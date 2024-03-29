import React, { useState } from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBootstrap, faCss3, faGitAlt, faHtml5, faJsSquare, faReact, faAngular, faNode, faSwift, faAws } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Firebase from '../../assets/img/faFirebase.png'
import Mongodb from '../../assets/img/faMongodb.png'
import Mysql from '../../assets/img/faMysql.png'
import Express from '../../assets/img/faExpress.png'
import Graphql from '../../assets/img/faGraphql.png'


const Skills = () =>
{
  const frontendSkills = [
    { name: "Javascript", icon: faJsSquare, color: "#EFD81D", proficiency: 4, details: "3 yrs exp" },
    { name: "HTML", icon: faHtml5, color: "#F06529", proficiency: 5, details: "4 yrs exp" },
    { name: "CSS", icon: faCss3, color: "#28A4D9", proficiency: 4, details: "4 yrs exp" },
    { name: "Bootstrap", icon: faBootstrap, color: "#7610f7", proficiency: 3, details: "1 yr exp" },
    { name: "React", icon: faReact, color: "#5ED4F4", proficiency: 5, details: "3 yrs exp" },
    { name: "Angular", icon: faAngular, color: "#DD0031", proficiency: 3, details: "1 yr exp" },
    { name: "SwiftUI", icon: faSwift, color: "#007AFF", proficiency: 3, details: "1 yr exp" },
  ];

  const backendSkills = [
    { name: "Node.js", icon: faNode, color: "#339933", proficiency: 4, details: "3 yrs exp" },
    { name: "Git", icon: faGitAlt, color: "#e44c2f", proficiency: 3, details: "3 yrs exp" },
    { name: "AWS", icon: faAws, color: "#FF9900", proficiency: 2, details: "1 yr exp" },
    { name: "Firebase", img: Firebase, color: "#FF9900", proficiency: 2, details: "1 yr exp" },
    { name: "MongoDB", img: Mongodb, color: "#FF9900", proficiency: 3, details: "3 yrs exp" },
    { name: "MySQL", img: Mysql, color: "#FF9900", proficiency: 3, details: "3 yrs exp" },
    { name: "Express.js", img: Express, color: "#FF9900", proficiency: 4, details: "3 yrs exp" },
    { name: "GraphQL", img: Graphql, color: "#FF9900", proficiency: 4, details: "3 yrs exp" },
  ]

    const renderSkillIcon = (skill) => {
    if (skill.icon) {
      return <FontAwesomeIcon icon={skill.icon} color={skill.color} />;
    } else if (skill.img) {
      return <img className='icon-img' src={skill.img} alt={`${skill.name} icon`}  />;
    }
  };

  const renderSkillCards = (skills) => (
    skills.map((skill, index) => (
      <div key={index} className="skill-card">
        <div className="icon-container">
          {renderSkillIcon(skill)}
        </div>
        <div className="details-container">
          <h3>{skill.name}</h3>
          <h4>{skill.details}</h4>
          <div className="proficiency">{renderStars(skill.proficiency)}</div>
        </div>
      </div>
    ))
  );

  const renderStars = ( count ) =>
  {
    return Array.from( { length: count }, ( _, i ) => (
      <FontAwesomeIcon key={i} icon={faStar} color="gold" />
    ) );
  };

  return (
    <div className='skills-page'>
      <div className='skills-container'>
        <div className='skill'>
          <h1>Frontend Skills</h1>
          <div className='skill-section frontend-skills'>
            {renderSkillCards( frontendSkills )}
          </div>
        </div>
        <div className='skill'>
          <h1>Backend Skills</h1>
          <div className='skill-section backend-skills'>
            {renderSkillCards( backendSkills )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;

