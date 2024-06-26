import React, { useState, useEffect } from 'react'
import './index.scss';
import logo from '../../assets/img/c-logo.png'
import { stack as Menu } from 'react-burger-menu';


const Navbar = ( { fullpageApi , currentSection } ) =>
{
  const [ isMenuOpen, setIsMenuOpen ] = useState( false );
  const [ isMobileView, setIsMobileView ] = useState( window.innerWidth < 1068 );
  const isCurrent = (sectionIndex) => currentSection === sectionIndex;


  var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '35px',
    height: '25px',
    right: '20px',
    top: '20px'
  },
  bmBurgerBars: {
    background: '#cad2c5'
  },
  bmBurgerBarsHover: {
    background: '#84a98c'
  },
  bmCrossButton: {
    display: 'none',
  },
  bmCross: {
    background: '#cf191b'
  },
  bmMenuWrap: {
    position: 'fixed',
    top: '0px',
  },
  bmMenu: {
    background: '#84a98c',
    paddingTop: '3.5em',
    fontSize: '1.15em',
    overflow: 'none',
    height: '100vh',
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#354f52',
    padding: '0.8em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'

  },
  bmItem: {
    display: 'inline-block',
    textDecoration: 'none',
    color: '#354f52',
    padding: '15px'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    top: '0',
    left: '0',
    width: '100vw',

  }
}

    const closeMenu = () => {
    setIsMenuOpen(false);
  };


  useEffect( () =>
  {
    const handleResize = () =>
    {
      setIsMobileView( window.innerWidth < 1068 );
    };
    window.addEventListener( 'resize', handleResize );
    return () => window.removeEventListener( 'resize', handleResize );
  }, [] );

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <a href="#home" onClick={() => fullpageApi?.moveTo( 1 )}><img className='logo' src={logo} alt={"c logo"} /></a>
      </div>
            {isMenuOpen && <div className="bm-overlay" onClick={closeMenu}></div>}

      {isMobileView ? (
        <Menu right isOpen={isMenuOpen} styles={ styles } pageWrapId={"page-wrap"} onStateChange={({ isOpen })  => setIsMenuOpen(isOpen)}>
          <a href="#home" onClick={() => fullpageApi?.moveTo( 1 )}>Home<span className={isCurrent( 0 ) ? 'underline' : ''}></span></a>
          
          <a href="#about" onClick={() => fullpageApi?.moveTo( 2 )}>About<span className={isCurrent( 1 ) ? 'underline' : ''}></span></a>
          
          <a href="#skills" onClick={() => fullpageApi?.moveTo( 3 )}>Skills<span className={isCurrent( 2 ) ? 'underline' : ''}></span></a>
          
          <a href="#projects" onClick={() => fullpageApi?.moveTo( 4 )}>Projects
            <span className={isCurrent( 3 ) ? 'underline' : ''}></span></a>
          
          <a href="#contact" onClick={() => fullpageApi?.moveTo( 5 )}>Contact<span className={isCurrent( 4 ) ? 'underline' : ''}></span></a>
        </Menu>
        
      ) : (
        <div className='nav-links'>
          <a className={isCurrent(0) ? 'active' : ''} href="#home" onClick={() => fullpageApi?.moveTo( 1 )}>Home</a>
          <a className={isCurrent(1) ? 'active' : ''} href="#about" onClick={() => fullpageApi?.moveTo( 2 )}>About</a>
          <a className={isCurrent(2) ? 'active' : ''} href="#skills" onClick={() => fullpageApi?.moveTo( 3 )}>Skills</a>
          <a className={isCurrent(3) ? 'active' : ''} href="#projects" onClick={() => fullpageApi?.moveTo( 4 )}>Projects</a>
          <a className={isCurrent(4) ? 'active' : ''} href="#contact" onClick={() => fullpageApi?.moveTo( 5 )}>Contact</a>
        </div>
      )}
      {/* <!--Dark mode toggle--> */}
      {/* <div className="theme-switch-wrapper">
        <input type="checkbox" id="theme-switch" className="theme-switch" />
        <label htmlFor="theme-switch" className="toggle-label">
          <i className='bx bx-sun' aria-hidden="true"></i>
          <i className='bx bx-moon' aria-hidden="true"></i>
        </label>
      </div> */}
    </div >
  )
}

export default Navbar