import React from 'react';
import './index.scss';
import charlie from '../../assets/images/charles.png'
import TypeWriterEffect from 'react-typewriter-effect';

const Home = ( { fullpageApi } ) =>
{
  return (
    <div className='home-container'>
      <div className='main-container'>
        <div className='intro'>
          <h1>Hi,
            <br />
            I'm <span className='red'>Charles</span>
            <br />
            <TypeWriterEffect
              textStyle={{ fontFamily: 'Ubuntu' }}
              startDelay={50}
              cursorColor="#fff"
              multiText={[
                'Web Developer',
                'Content Creator',
                'Dog Dad',
                'Musician'
              ]}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              loop={true}
            />

          </h1>
          <div className='contact-button'>
            <a href="#contact" onClick={() => fullpageApi?.moveTo( 6 )}>Contact</a></div>
        </div>

        <div className='img-container'>
          <img className='charlesCartoon' src={charlie} alt='charlie as a cartoon' />
        </div>
      </div>

      <div className='link-container'>
        <div className='link-list'>
          <a target="_blank" rel='noreferrer' href='https://medium.com/@gn4rtistic' exact='true' activeclassname='active' className='medium'>
            <i className='bx bxl-medium-square' ></i>
          </a>
          <a target="_blank" rel='noreferrer' href='https://www.linkedin.com/in/charles-houston-dev/' exact='true' activeclassname='active' className='linkedIn'>
            <i className='bx bxl-linkedin-square' ></i>
          </a>
          <a target="_blank" rel='noreferrer' href='https://github.com/gnartistic' exact='true' activeclassname='active' className='gitHub'>
            <i className='bx bxl-github' ></i>
          </a>
          {/* <a href='https://gnartistic.github.io/resume/' target="_blank" rel='noreferrer' activeclassname='active' className='resume'>
            <i className='bx bxs-file-pdf' ></i>
          </a> */}
          <a href='https://www.tiktok.com/@bytesizedcoder?is_from_webapp=1&sender_device=pc' activeclassname='active' className='tiktok'>
            <i className='bx bxl-tiktok' ></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home