import { Link } from 'react-router-dom';
import C2 from '../../assets/images/C2.png';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import Loader from 'react-loaders';

const Home = () =>
{
    const [ letterClass, setLetterClass ] = useState( 'text-animate' );
    const greetingArray = [ 'H', 'i',',', ' ', 'I', "'", 'm' ];
    const nameArrary = [ 'h', 'a', 'r', 'l', 'i', 'e', '!'];
    const jobArrary = [ 'w', 'e', 'b', ' ', 'd', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', '.' ];

    useEffect( () =>
    {
        setTimeout( () =>
        {
            return setLetterClass('text-animate-hover')
        }, 4000)
    }, []);

    return (
        <>
        <div className="container home-page">
            <div className="text-zone">
                <h1>
                    <AnimatedLetters letterClass={letterClass} strArray={greetingArray} idx={15} />
                    <img src={C2} alt="developer" />
                    <AnimatedLetters letterClass={letterClass} strArray={nameArrary} idx={15}/>
                    <br />
                    <AnimatedLetters letterClass={letterClass} strArray={jobArrary} idx={22} />
                </h1>
                <h2>Full Stack Developer/ Web Designer</h2>
                <Link to="/contact" className="flat-button">CONTACT ME</Link>
            </div>
            <Logo/>
            </div>
            <Loader type="line-scale-pulse-out-rapid" />
            </>
    )

}

export default Home;