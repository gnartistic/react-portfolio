import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss';


const Contact = () =>
{
    const [ letterClass, setLetterClass ] = useState( 'text-animate' );

    const form = useRef();

    useEffect( () =>
    {
        setTimeout( () =>
        {
            return setLetterClass( 'text-animate-hover' )
        }, 3000 )
    }, [] );

    const [ sentMessage, setsentMessage ] = useState( '' );

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()

        if( !sentMessage ) {
            setsentMessage( 'Submitted!' );
        } else {
            setsentMessage( '' );
        }

        sendEmail();
    }

    const sendEmail = () =>
    {
        emailjs
            .sendForm( 'gn4rtistic', 'template_i6x8ryc', form.current, '4_qmxz9FGpsLgzJvV' )
            .then(
                () =>
                {
                    window.location.reload( false )
                },
                () =>
                {
                    alert( 'Failed to send the message, please try again' )
                }
            )
    }

    return (
        <>
            <div className='container contact-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters letterClass={letterClass} strArray={[ 'C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e' ]} idx={15} />
                    </h1>
                    <p>
                        I am interested in freelance opportunities - especially unique or large projects. However, if you have any other requests or questions, don't hesitate to contact me using the form below!
                    </p>
                    <div className='contact-form'>
                        <form ref={form} onSubmit={handleSubmit}>
                            <ul>
                                <li className='half'>
                                    <input type="text" name="name" placeholder="Name" required />
                                </li>
                                <li className='half'>
                                    <input type="email" name="email" placeholder="Email" required />
                                </li>
                                <li>
                                    <input placeholder='Subject' type="text" name="subject" required />
                                </li>
                                <li>
                                    <textarea placeholder='Message' name='message'
                                        required></textarea>
                                </li>
                                <li className='buttonContainer'>
                                    {sentMessage && (
                                            <p className="sent-text">{sentMessage}</p>
                                    )}
                                    <input type='submit' className='flat-button' value='SEND' />
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
            <Loader type='line-scale-pulse-out-rapid' />
        </>
    )
}

export default Contact;