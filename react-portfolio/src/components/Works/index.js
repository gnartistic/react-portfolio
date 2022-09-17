import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import 'animate.css';
import { useState, useEffect } from 'react';
import Loader from 'react-loaders';
import coinWikiMac from '../../assets/images/coinWikiMac.png';
import coinWikiphone from '../../assets/images/coinWikiphone.png';
import hobbyxchangeMac from '../../assets/images/hobbyxchangeMac.png';
import hobbyxchangePhone from '../../assets/images/hobbyxchangeMobile.png';
import photoportMac from '../../assets/images/photoportMac.png';
import photoportPhone from '../../assets/images/photoportMobile.png';



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
                    <p className='special-p'>
                        As a Developer, I aim to engage my audience for an impactful user experience. All the apps I've built are  designed to be responsive in order to provide a uniform experience on the web across all devices.
                    </p>
                </div>
                <div className='display-container'>
                        <h2><a href='https://gnartistic.github.io/coinWiki2.0/'>coinWiki</a></h2>
                        <h3 className='description'>
                        CoinWiki is an app I'm working to develop with my past classmates that is a educational resource for cyptocurrency. 
                        </h3>
                        <div className='coinWiki'>
                            <img src={coinWikiMac} alt='coinWikiMac' className='Mac' />
                            <img src={coinWikiphone} className='Phone' alt='coinWikiphone' />
                        </div>
                    <h2><a href='https://hobbyxchange.herokuapp.com/#'>HobbyXchange</a></h2>
                        <h3 className='description'>
                        HobbyXchange is the place where failed hobbies go to die and be reborn. This app was built for those who frequently cycle through trying new hobbies and wish to sell or trade supplies with other users.
                        </h3>
                        <div className='hobbyXchange'>
                            <img src={hobbyxchangeMac} alt='hobbyXchangeMac' className='Mac' />
                            <img src={hobbyxchangePhone} className='Phone' alt='hobbyXchangeMobile' />
                        </div>
                        <h2><a href='https://gnartistic.github.io/photoPortfolio/'>Photographer Portfolio</a></h2>
                        <h3 className='description'>
                        This is a Photographer Portfolio template, I made this to showcase the kind of apps I can make for small business owners and freelane artists.
                        </h3>
                        <div className='photoPort'>
                            <img src={photoportMac} alt='photoportMac' className='Mac' />
                            <img src={photoportPhone} className='Phone' alt='photoportMobile' />
                    </div>
                </div>
                
            </div>
            <Loader type='line-scale-pulse-out-rapid' />
        </>
    )
}

export default Works;