import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import { useState, useEffect } from 'react';
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
                <p>I am a full-stack developer with a keen eye for innovative solutions and a drive to excel in the tech industry. My journey in programming is marked by a constant thirst for knowledge and a commitment to excellence in every project I undertake.</p>
                    <p> With a focus on both front-end and back-end technologies, I strive to create seamless, efficient, and impactful digital experiences.</p>
                <p>At the heart of my work ethic is a dedication to problem-solving and a belief in the power of technology to transform ideas into reality. </p>
            </div>
        </div>
            <Loader type="line-scale-pulse-out-rapid" />
        </>
    )
}

export default About;