import { FaMoon, FaSun } from 'react-icons/fa';
import { TbLanguageOff, TbLanguage } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";

export default function Navbar({darkMode, language, toggleDarkMode, toggleLanguage}){

    const handleGithubIcon = () => {
        
    }

    return(
        <nav>
            <button onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button onClick={toggleLanguage}>
            {language === 'es' ? <TbLanguage />  : <TbLanguageOff /> }
            </button>

            <button>
                <a  className='link-icon'
                    href="https://github.com/nicofpalma" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <FaGithub/>
                </a>
            </button>
        </nav>
    )
}