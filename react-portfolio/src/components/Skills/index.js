import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBootstrap, faCss3, faGitAlt, faHtml5, faJsSquare, faReact } from '@fortawesome/free-brands-svg-icons';
import Loader from 'react-loaders';

const Skills = () =>
{
    const [ letterClass, setLetterClass ] = useState( 'text-animate' );

    useEffect( () =>
    {
        setTimeout( () =>
        {
            return setLetterClass( 'text-animate-hover' )
        }, 3000 )
    }, [] );

    return (
        <>
            <div className='container skills-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters letterClass={letterClass} strArray={[ 'S', 'k', 'i', 'l', 'l', 's', ]} idx={15} />
                    </h1>
                    <div className='list-container'>
                        <div className='list1'>
                            <h2>Languages</h2>
                            <ul>
                                <li>JavaScript,</li>
                                <li>TypeScript,</li>
                                <li>JSX,</li>
                                <li>MySQL,</li>
                                <li>MongoDB,</li>
                                <li>React,</li>
                                <li>HTML,</li>
                                <li> and CSS.</li>
                            </ul>
                        </div>
                        <div className='list2'>
                            <h2>Technologies</h2>
                            <ul>
                                <li>AJAX,</li>
                                <li>jQuery,</li>
                                <li>Node.js,</li>
                                <li>Mongoose,</li>
                                <li>GraphQL,</li>
                                <li>GIT,</li>
                                <li>Express.js,</li>
                                <li>Bootstrap,</li>
                                <li>Bulma,</li>
                                <li>Angular,</li>
                                <li>Node.js,</li>
                                <li>Swift,</li>
                                <li>and Tailwind CSS.</li>
                            </ul>
                        </div>
                        <div className='list3'>
                            <h2>Applications</h2>
                            <ul>
                                <li>VSCode,</li>
                                <li>Insomnia,</li>
                                <li>Adobe Photoshop Express,</li>
                                <li>Apollo GraphQL,</li>
                                <li>and Xcode.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='stage-cube-cont'>
                    <div className='cubespinner'>
                        <div className='face1'>
                            <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
                        </div>
                        <div className='face2'>
                            <FontAwesomeIcon icon={faHtml5} color="#F06529" />
                        </div>
                        <div className='face3'>
                            <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
                        </div>
                        <div className='face4'>
                            <FontAwesomeIcon icon={faBootstrap} color="#7610f7" />
                        </div>
                        <div className='face5'>
                            <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
                        </div>
                        <div className='face6'>
                            <FontAwesomeIcon icon={faGitAlt} color="#e44c2f" />
                        </div>
                    </div>
                </div>
            </div>
            <Loader type='line-scale-pulse-out-rapid' />
        </>
    )
}

export default Skills;