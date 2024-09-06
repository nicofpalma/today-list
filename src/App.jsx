import { useEffect, useRef, useState } from 'react';
import './App.css';
import Task from './components/Task';
import Time from './components/TimeLeft';
import { RxPlus } from "react-icons/rx";
import { FaMoon, FaSun } from 'react-icons/fa';
import '/src/components/DataGlow.js';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { TbLanguageOff } from "react-icons/tb";
import { TbLanguage } from "react-icons/tb";

// TODO: Add tasks to localStorage
if(localStorage.getItem('idCounter')){
  let idCounter = parseInt(localStorage.getItem('idCounter')); 
} else {
  let idCounter = 0;
  localStorage.setItem('idCounter', '0');
}

let tasksIds = 0;

function App() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const [language, setLanguage] = useState(i18n.language);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') 
      ? JSON.parse(localStorage.getItem('darkMode'))
      : false
  );


  useEffect(() => {
    const root = document.documentElement;

    if(darkMode){
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }

    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const toggleLanguage = () => {
    if(language === 'es'){
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('es');
    }

    setLanguage(i18n.language);
  }

  const handleAddTask = () => {
    if(inputRef.current.value.trim() !== ''){
      const newTask = {
        id: tasksIds++,
        name: inputRef.current.value
      }
  
      setTasks(prev => [newTask, ...prev ]);
      console.log(tasks);
      
      inputRef.current.value = '';
    }
  }

  const handleDeleteTask = (taskId) => {    
    setTimeout(() => {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }, 500);

  }

  return (
    <div className='bg'>
      <div className='box'>
        <main>
          <div className='box-header'>
            <h1>{t("Today's List")}</h1>
            <div className='time'>
              <Time></Time>
            </div>
          </div>

          <div className='box-add'>
            <input 
              type="text" 
              placeholder={t('Title of task')} 
              className='add-input' 
              ref={inputRef}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />

            <button className='add-btn' onClick={handleAddTask}><RxPlus /></button>

          
          </div>

          <div className='box-body'>
            {tasks.length === 0 
              ? <div className='no-tasks'><p>{t('No tasks added yet')}</p></div>
              : tasks.map(task => (
                <Task 
                  key={task.id}
                  taskName={task.name}
                  onDelete={() => handleDeleteTask(task.id)}
                />
            ))}
          </div>

        </main>
      </div>

      <div className='footer-btns'>
        <button className='toggle-btns' onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button className='toggle-btns' onClick={toggleLanguage}>
          {language === 'en' ? <TbLanguage />  : <TbLanguageOff /> }
        </button>
      </div>

    </div>

  )
}

export default App
