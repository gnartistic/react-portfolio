import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBootstrap, faCss3, faGitAlt, faHtml5, faJsSquare, faReact } from '@fortawesome/free-brands-svg-icons';
import Loader from 'react-loaders';

const Works = () =>
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
                    <AnimatedLetters letterClass={letterClass}  strArray={[ 'W', 'o', 'r', 'k', 's',]} idx={15} />
                </h1>
                <p>
                    
                </p>
            </div>
        </div>
        <Loader type='line-scale-pulse-out-rapid'/>
    </>
            )
}

export default Works;