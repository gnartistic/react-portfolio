import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import Logo from '../../assets/images/sideBarLogo.png';
import LogoSubtitle from '../../assets/images/name.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faUser, faFileLines, faScrewdriverWrench, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () =>
(
    <div className='nav-bar'>
        <Link className='logo' to='/'>
            <img src={Logo} alt='logo' />
            <img className="sub-logo" src={LogoSubtitle} alt='logo' />
        </Link>
        <nav>
            <NavLink exact='true' activeclassname='active' to='/'>
                <FontAwesomeIcon icon={faHome} size="lg" color="#fefefe" />
            </NavLink>

            <NavLink exact='true' activeclassname='active' className="about-link" to='/about'>
                <FontAwesomeIcon icon={faUser} size="lg" color="#fefefe" />
            </NavLink>
            <NavLink exact='true' activeclassname='active' className="contact-link" to='/contact'>
                <FontAwesomeIcon icon={faEnvelope} size="lg" color="#fefefe" />
            </NavLink>
            <NavLink exact='true' activeclassname='active' className='skills-link' to='/skills'>
                <FontAwesomeIcon icon={faScrewdriverWrench} size="lg" color="#fefefe" />
            </NavLink>
            <NavLink exact='true' activeclassname='active' className='works-link' to='/works'>
                <FontAwesomeIcon icon={faLaptopCode} size="lg" color="#fefefe" />
            </NavLink>
        </nav>
        <ul>
            <li>
                <a target="_blank" rel='noreferrer' href='https://www.linkedin.com/in/charlie-houston-43220a236' exact='true' activeclassname='active' className='linkedIn'>
                    <FontAwesomeIcon icon={faLinkedin} color="#fefefe"/>
                </a>
            </li>
            <li>
                <a target="_blank" rel='noreferrer' href='https://github.com/gnartistic' exact='true' activeclassname='active' className='gitHub'>
                    <FontAwesomeIcon icon={faGithub} color="#fefefe" />
                </a>
            </li>
            <li>
                <a target="_blank" rel='noreferrer' href='/charlie-houston-resume.pdf' activeclassname='active' className='resume'>
                    <FontAwesomeIcon icon={faFileLines} color="#fefefe" />
                </a>
            </li>
        </ul>
    </div>
)

export default Sidebar;