import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import './index.scss'
import paperplane from '../../assets/img/paperplane.png'

const Contact = () =>
{

  const form = useRef();

  const sendEmail = ( e ) =>
  {
    e.preventDefault()

    emailjs
      .sendForm( 'gn4rtistic', 'template_i6x8ryc', form.current, '4_qmxz9FGpsLgzJvV' )
      .then(
        () =>
        {
          alert( 'Message successfully sent!' )
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
      <div className='contact-container'>
        <div className='contact-page'>
        < div className='text-zone'>
          <p>
            I am interested in freelance opportunities - especially ambitious or large projects. However, if you have any other requests or questions, don't hesitate to contact me using the form below!
          </p>
          <div className='contact-form'>
            <form ref={form} onSubmit={sendEmail}>
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
                <li>
                  <input type='submit' className='flat-button' value='SEND' />
                </li>
              </ul>
            </form>
            </div>
          </div>
          <div className='paperplane-container'>
            <img className='paperplane' src={paperplane} alt='paperplane icon'/>
          </div>
        </div>
        </div>
      <Loader type='line-scale-pulse-out-rapid' />
    </>
  )
}

export default Contact