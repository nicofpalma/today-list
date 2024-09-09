import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { TbLanguageOff } from "react-icons/tb";
import { TbLanguage } from "react-icons/tb";


// eslint-disable-next-line react/prop-types
export default function FooterButtons({darkMode, language, toggleDarkMode, toggleLanguage})
{
    const [isShowing, setIsShowing] = useState(false);

    const handleShowButtons = () => {
        setIsShowing(true);
    }

    


    return(

            <div className='footer-btns'>
                <button className='toggle-btns' onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            
                <button className='toggle-btns' onClick={toggleLanguage}>
                {language === 'en' ? <TbLanguage />  : <TbLanguageOff /> }
                </button>
            </div>



    )
}