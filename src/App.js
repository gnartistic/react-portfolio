import React, { useState, useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import './index.scss';
import './App.scss';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Skills from './Components/Skills';
import Projects from './Components/Projects';
import Contact from './Components/Contact';

const App = () =>
{

  const fullpages = [
    { component: <Home />, anchor: 'home' },
    { component: <About />, anchor: 'about' },
    { component: <Skills />, anchor: 'skills' },
    { component: <Projects />, anchor: 'projects' },
    { component: <Contact />, anchor: 'contact' },
  ];

  const [ currentSection, setCurrentSection ] = useState( 0 );

  const onLeave = ( origin, destination, direction ) =>
  {
    setCurrentSection( destination.index );
  };
  
  return (
    <>
      <div className="App" id="page-wrap">
        <Navbar currentSection={currentSection} />
        <ReactFullpage
          lazyLoading={true}
          licenseKey="M09AH-6I3Y7-J7H58-CBJSJ-XBVMN"
          scrollingSpeed={1000}
          css3={true}
          responsiveWidth={768}
          responsiveHeight={1000}
          dragAndMove={true}
          loopBottom={true}
          credits={
            {
              enabled: false,
              label: 'Made with fullPage.js',
              position: 'right'
            }
          }
        onLeave={onLeave}
        anchors={fullpages.map( page => page.anchor )}
        render={() => (
          <ReactFullpage.Wrapper>
            {fullpages.map( ( { component }, index ) => (
              <div key={index} className="section">
                {component}
              </div>
            ) )}
          </ReactFullpage.Wrapper>
        )}
                />
      </div>
    </>
  );
};

export default App;


