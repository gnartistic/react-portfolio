import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBootstrap, faCss3, faGitAlt, faHtml5, faJsSquare, faReact } from '@fortawesome/free-brands-svg-icons';
import Loader from 'react-loaders';


const About = () =>
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
        <div className='container about-page'>
            <div className='text-zone'>
                <h1>
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={[ 'A', 'b', 'o', 'u', 't', ' ', 'm', 'e' ]} idx={15}
                    />
                </h1>
                <p>I'm a very ambitious fullstack developer looking for a role in an established company with opportunities to work with the latest technologies on challenging and diverse projects.</p>
                <p>I'm quietly confident, naturally curious, and perpetually working on developing my skills one error at a time.</p>
                <p>If I had to define myself in one sentence, it'd be:
                    <br/> I am a natural engineer with a creative background, obsessed with exploring this planet, and a strong love for my family and dogs. </p>
            </div>

            <div className='stage-cube-cont'>
                <div className='cubespinner'>
                    <div className='face1'>
                        <FontAwesomeIcon icon={faJsSquare} color="#EFD81D"/>
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
            <Loader type="line-scale-pulse-out-rapid" />
        </>
    )
}

export default About;