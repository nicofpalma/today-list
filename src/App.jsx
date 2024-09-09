import { useEffect, useRef, useState } from 'react';
import './App.css';
import Task from './components/Task';
import Time from './components/TimeLeft';
import { RxPlus } from "react-icons/rx";
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FooterButtons from './components/FooterButtons';
import Navbar from './components/Navbar';

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
        id: String(tasksIds++),
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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  return (
    <div className='bg'>
      <Navbar
        darkMode={darkMode} 
        language={language} 
        toggleDarkMode={toggleDarkMode} 
        toggleLanguage={toggleLanguage} 
      ></Navbar>
      <header className='box-header'>
        <h1>{t("Today's List")}</h1>
      </header>
      <Time></Time>
      <div className='box'>
        <section>
          <div className='box-add'>
            <input 
              type="text" 
              placeholder={t('Title of task')} 
              className='add-input' 
              ref={inputRef}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              maxLength={'100'}
            />

            <button className='add-btn' onClick={handleAddTask}><RxPlus /></button>
          </div>

          <div className='box-body'>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='tasks'>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className='task-list'
                  >
                    {tasks.length === 0 
                      ? <div className='no-tasks'><p>{t('No tasks added yet')}</p></div>
                      : tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index} className='draggable-task'>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Task
                                key={task.id}
                                taskName={task.name}
                                onDelete={() => handleDeleteTask(task.id)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </section>
      </div>

    </div>

  )
}

export default App
