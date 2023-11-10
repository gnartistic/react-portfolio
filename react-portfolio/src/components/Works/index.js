import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import 'animate.css';
import { useState, useEffect } from 'react';
import Loader from 'react-loaders';
import rapptrLabs from '../../assets/images/RapptrLabs.png';
import rapptrLabsPhone from '../../assets/images/rapptrLabs-phone.png'
import starWarsApi from '../../assets/images/StarWarInfo.png'
import amberPort from '../../assets/images/amberPort.png'
import amberPortPhone from '../../assets/images/amberPort-phone.png'



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
                        <AnimatedLetters letterClass={letterClass} strArray={[ 'W', 'o', 'r', 'k', 's', ]} idx={20} />
                    </h1>
                    <p>
                        As a Developer, I aim to engage my audience for an impactful user experience. All the apps I've built are  designed to be responsive in order to provide a uniform experience on the web across all devices.
                    </p>
                </div>
                <div className='display-container'>
                        <h2><a href='https://gnartistic.github.io/this/'>Rapptr Labs Login</a></h2>
                        <h3 className='description'>I developed a dual-purpose login and to-do list component for Rapptr Labs using React. This component features robust input verification for secure user authentication and includes an integrated to-do list for enhanced user engagement and productivity. The design showcases the seamless combination of security and functionality in a user-friendly interface.
                        </h3>
                        <div className='coinWiki'>
                            <img src={rapptrLabs} alt='coinWikiMac' className='Mac' />
                            <img src={rapptrLabsPhone} className='Phone' alt='rapptr-labs' />
                        </div>
                    <h2><a href='https://hobbyxchahttps://gnartistic.github.io/StarWarsApi/'>Star Wars Wiki</a></h2>
                        <h3 className='description'>
                        I designed a Star Wars-themed app leveraging the Star Wars API to dynamically present information on various planets and characters. Utilizing React-Query, the app efficiently manages API calls, ensuring up-to-date data retrieval and optimal performance. The interface is user-centric, allowing for interactive searches and displaying information responsively based on user input. This project showcases my ability to integrate APIs and handle real-time data manipulation in a React environment, providing an engaging and informative user experience for Star Wars enthusiasts.
                        </h3>
                        <div className='hobbyXchange'>
                            <img src={starWarsApi} alt='hobbyXchangeMac' className='Mac' />
                        </div>
                        <h2><a href='https://gnartistic.github.io/Amber-portfolio/#/'>Custom Clothing Creator Portfolio</a></h2>
                        <h3 className='description'>
                        I developed this portfolio site for a friend's unique business of crafting custom clothing from used and recycled materials. The app showcases their collection with a focus on sustainability and creativity. Intuitive navigation and a clean, visually appealing layout allow users to explore the collection with ease. This app not only highlights my friend's artistic talent but also underscores the importance of eco-friendly fashion practices.
                        </h3>
                        <div className='photoPort'>
                            <img src={amberPort} alt='photoportMac' className='Mac' />
                            <img src={amberPortPhone} className='Phone' alt='photoportMobile' />
                    </div>
                </div>
                
            </div>
            <Loader type='line-scale-pulse-out-rapid' />
        </>
    )
}

export default Works;