import { Link } from 'react-router-dom';
import C2 from '../../assets/images/whiteC.png';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import Loader from 'react-loaders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faUser, faFileLines, faScrewdriverWrench, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';

const Home = () =>
{
    const [ letterClass, setLetterClass ] = useState( 'text-animate' );
    const greetingArray = [ 'H', 'i', ',', ' ', 'I', "'", 'm' ];
    const nameArrary = [ '','C','h', 'a', 'r', 'l', 'i', 'e', '!' ];
    const jobArrary = [ 'w', 'e', 'b', ' ', 'd', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', '.' ];

    useEffect( () =>
    {
        setTimeout( () =>
        {
            return setLetterClass( 'text-animate-hover' )
        }, 4000 )
    }, [] );

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters letterClass={letterClass} strArray={greetingArray} idx={15} />
                        <AnimatedLetters letterClass={letterClass} strArray={nameArrary} idx={15} />
                        <br />
                        <AnimatedLetters letterClass={letterClass} strArray={jobArrary} idx={22} />
                    </h1>
                    <h2>Full Stack Developer/ Tech Blogger</h2>

                <ul className='link-list'>
                        <li>
                            <a target="_blank" rel='noreferrer' href='https://medium.com/@gn4rtistic' exact='true' activeclassname='active' className='medium'>
                                <FontAwesomeIcon icon={faMedium} color="#fefefe" />
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel='noreferrer' href='https://www.linkedin.com/in/charlie-houston-43220a236/' exact='true' activeclassname='active' className='linkedIn'>
                                <FontAwesomeIcon icon={faLinkedin} color="#fefefe" />
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel='noreferrer' href='https://github.com/gnartistic' exact='true' activeclassname='active' className='gitHub'>
                                <FontAwesomeIcon icon={faGithub} color="#fefefe" />
                            </a>
                        </li>
                        <li>
                            <a href='https://gnartistic.github.io/resume/' target="_blank" rel='noreferrer' activeclassname='active' className='resume'>
                                <FontAwesomeIcon icon={faFileLines} color="#fefefe" />
                            </a>
                        </li>
                    </ul>

                </div>
                <Logo />
            </div>
            <Loader type="line-scale-pulse-out-rapid" />
        </>
    )

}

export default Home;