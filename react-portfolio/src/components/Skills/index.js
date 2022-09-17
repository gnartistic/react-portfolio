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
            <div className='container works-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters letterClass={letterClass} strArray={[ 'S', 'k', 'i', 'l', 'l', 's', ]} idx={15} />
                    </h1>
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