import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './index.scss'; // Make sure to create this CSS file for styling
import profilePic from '../../assets/img/IMG_1066.jpeg'

const AboutMe = () =>
{

    const paragraphs = [
        "I've always been a creative and hands-on person; starting out as a welder and freelance contractor, then finding my way into programming. It's been an exciting adventure to learn new ways to create. Deciding to transition from building things with physical tools and materials to building virtual worlds with software development wasn't just a change in employment. It felt more like taking what I've always loved doing and just doing it a new way.",

        "After completing my coding bootcamp at UTSA and spending a year honing my skills through personal projects, I explored an internship with The OOS Group. Initially diving into MEAN stack development, I soon found myself transitioning into an exciting new role as an iOS Developer. This move not only broadened my technical horizons, but also deepened my appreciation for the versatility and potential within the world of application development.",

        "To me, being a developer is not just about writing code; it's about continuous learning and satisfying that ever-present curiosity about how things work. Every line of code is a step towards creating something new and exciting, much like crafting a tangible structure or object.",

        "Bringing ideas to life, whether through developing an innovative app or while playing guitar, is what I live for. Away from the keyboard, I enjoy spending my time traveling and exploring the world with my wife and our two dogs, soaking in new experiences and creating lasting memories."
    ]

    const [ currentParagraph, setCurrentParagraph ] = useState( 0 );
    const [ animation, setAnimation ] = useState( '' );

    const goToParagraph = (index) => {
        
        if(index >= paragraphs.length || index < 0) {
            // Trigger shake animation
            setAnimation('shake-animation');
            setTimeout(() => {
                setAnimation('');
            }, 800); // Length of the shake animation
            return;
        }

        if (index > currentParagraph) {
            setAnimation('animate__animated animate__fadeOutLeft');
        } else {
            setAnimation('animate__animated animate__fadeOutRight');
        }

        setTimeout(() => {
            setCurrentParagraph(index);
            setAnimation(index > currentParagraph ? 'animate__animated animate__fadeInRight' : 'animate__animated animate__fadeInLeft');
        }, 500);
    };

        const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleSwipe(currentParagraph + 1),
        onSwipedRight: () => handleSwipe(currentParagraph - 1),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    const handleSwipe = (newIndex) => {
        goToParagraph(newIndex);
    };


    return (
        <div className='about-container' {...swipeHandlers}>
            <div className='main-container'>
                <div className='profile-image-container'>
                    <img data-src={profilePic} alt='Profile' className='profile-image' />
                </div>
                <div className='about-me-content'>
                    <p className={animation}>{paragraphs[ currentParagraph ]}</p>
                    <div className="navigation-dots">
                        {paragraphs.map( ( _, index ) => (
                            <span
                                key={index}
                                className={`dot ${ currentParagraph === index ? 'active' : '' }`}
                                onClick={() => goToParagraph( index )}
                            ></span>
                        ) )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;