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
                <p>I'm a very ambitious and creative fullstack developer looking for a role in an established company with opportunities to work with the latest technologies on challenging and diverse projects.</p>
                    <p>I'm quietly confident, naturally curious, and perpetually working on developing my skills... one error at a time.</p>
                    <br/>
                <p><span className='smaller'>If I had to define myself in one sentence, it'd be:</span>
                        <br />
                    <br/> <span className='bold'>I am a natural engineer, who loves to explore, obsessed with experiencing the most this life has to offer with my family and 2 dogs.</span> </p>
            </div>
        </div>
            <Loader type="line-scale-pulse-out-rapid" />
        </>
    )
}

export default About;