import React, {useState} from 'react'
import './index.scss'
import ProjectCard from './ProjectCard.js'
import ProjectModal from './ProjectModal.js'
import VirtuAI from '../../assets/img/VirtuAI.png'
import fetch from '../../assets/img/fetchPrev.png'
import S61C from '../../assets/img/S61C.png'
import ATiMS from '../../assets/img/ATiMS.png'
import rapptrLabs from '../../assets/img/rapptrlabs.png'
import starwars from '../../assets/img/starwars.png'

const Projects = () =>
{

  const [ selectedProject, setSelectedProject ] = useState( null );
  
  const projects = [
    {
      title: "VirtuAI",
      description: "VirtuAI is an advanced chatbot built with Angular, integrating OpenAI's GPT technology for natural, intuitive conversations. Its responsive Angular interface, combined with the power of ChatGPT, allows VirtuAI to handle diverse queries with ease. Experience a new level of digital interaction, whether for business, customer service, or personal use.",
      imageUrl: VirtuAI,
      repoLink: "https://github.com/gnartistic/virtuai-chatbot",
      liveLink: "https://virtuai-chatbot.vercel.app/"
    },
    {
      title: "Fetch: Pet Friendly Dating",
      description: "Fetch revolutionizes social and romantic connections for pet owners, blending React's dynamic interface with a robust GraphQL backend for seamless interactions. Ideal for finding pet playmates or connecting with fellow pet enthusiasts, Fetch creates a unique community where pets are at the heart of every connection.",
      imageUrl: fetch,
      repoLink: "https://github.com/gnartistic/fetch2.0",
      liveLink: "https://fetch-alpha.vercel.app/"
    },
    {
      title: "S61C",
      description: "Contributing at the OOS Group, I helped develop S61C, an app built with SwiftUI and backed by Firebase. S61C connects flight students with the ideal instructors, streamlining the learning process and advancing instructors’ careers. It's a pivotal tool in the aviation training industry, blending technology with education.",
      imageUrl: S61C,
      repoLink: "https://github.com/gnartistic/s61c-courses",
      liveLink: "https://apps.apple.com/us/app/s61c/id1508988735"
    },
    {
      title: "ATiMS Maintenance",
      description: "At the OOS Group, I developed the front-end of ATiMS Maintenance, an web application that revolutionizes maintenance management for flight schools. Using Angular and TypeScript, this customizable software is tailored specifically to each school’s needs, ensuring streamlined maintenance workflows. Powered by AWS and Node.js, ATiMS Maintenance offers robust, reliable performance, making it an indispensable tool in aviation education maintenance.",
      imageUrl: ATiMS,
      repoLink: "https://github.com/oosgroup/ATiMS_Maintenance",
      liveLink: "https://mx.atimsaviation.com/#/login"
    },
    {
      title: "Rapptr Labs Login",
      description: "At Rapptr Labs, I designed and developed an employee login interface, leveraging the power and flexibility of React. This interface streamlines the sign-in process, offering a user-friendly and secure gateway for employees. It exemplifies efficient design, integrating seamlessly with Rapptr Labs’ internal systems, and enhancing the overall user experience for staff.",
      imageUrl: rapptrLabs,
      repoLink: "https://github.com/gnartistic/this",
      liveLink: "https://gnartistic.github.io/this/"
    },
    {
      title: "Star Wars API interface",
      description: "This is a fun, interactive app I created to delve into the universe of Star Wars. Designed to harness the power of the Star Wars API, it filters and presents detailed information about the saga's diverse characters, planets, and people. Built as a personal project to explore the capabilities of React-Query, this app not only showcases data-fetching efficiency but also brings the beloved Star Wars galaxy to the fingertips of fans, providing an engaging way to learn more about their favorite aspects of the series.",
      imageUrl: starwars,
      repoLink: "https://github.com/gnartistic/StarWarsApi",
      liveLink: "https://gnartistic.github.io/StarWarsApi/"
    }
  ];

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="projects-container" >
      <div className='projects'>
        {projects.map((project, index) => (
        <div key={index} onClick={() => openModal(project)}>
          <ProjectCard {...project} />
        </div>
      ))}
      </div>
      
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </div>
  );
};

export default Projects;
