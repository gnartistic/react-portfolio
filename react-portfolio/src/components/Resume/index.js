import AnimatedLetters from '../AnimatedLetters';
import { useState, useEffect } from 'react';
import './index.scss';
import Loader from 'react-loaders';


const Resume = () =>
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
                    <AnimatedLetters letterClass={letterClass}  strArray={[ 'R', 'e', 's', 'u', 'm', 'e',]} idx={15} />
                </h1>
                <p>
                    
                </p>
            </div>
        </div>
          <Loader type='line-scale-pulse-out-rapid'/>
    </>
            )
}

export default Resume;