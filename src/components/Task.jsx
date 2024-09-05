/* eslint-disable react/prop-types */
import { MdOutlineEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import './DataGlow.css';
import { IoCheckmarkOutline } from "react-icons/io5";
import { PiCheckFatFill } from "react-icons/pi";


export default function Task({taskName, onDelete, id}){
    const [taskDeleted, setTaskDeleted] = useState(false); 
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [timeAdded, setTimeAdded] = useState('00:00:00');
    const [timeDone, setTimeDone] = useState('00:00:00');

    function getActualTime(){
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        setTimeAdded(getActualTime());
    }, []);

    if(taskDeleted){
        onDelete(id);
    }

    const handleTaskCompleted = () => {
        if(!taskCompleted){
            setIsCompleting(true);
            setTimeDone(getActualTime());
            setTaskCompleted(true);
            setTimeout(() => {
                setIsCompleting(false);
            }, 1000);
        } else {
            setTaskCompleted(false);
        }
        setTimeDone(getActualTime());

    }

    const handleEdit = (e) => {
        e.stopPropagation();
    }

    const handleDelete = (e) => {
        console.log('asdasdasd');
        
        e.stopPropagation();
        setTaskDeleted(!taskDeleted);
    }

    return (
        <div 
            className={`task-box 
                ${taskCompleted ? 'completed' : ''} 
                ${taskDeleted ? 'deleted' : ''}
                ${isCompleting ? 'completing' : ''}`
            } 
            onClick={handleTaskCompleted}
        >
            {isCompleting && (
                <PiCheckFatFill></PiCheckFatFill>
            )}

            <div className='task-content'>
                <div className='task-text'>
                    <p className={`${taskCompleted ? 'done' : ''}`}>{taskName}</p>
                    <p className='time-added'>Added: {timeAdded}</p>
                    {taskCompleted && (
                        <p className='time-added'>Done: {timeDone}</p>
                    )}
                </div>
            </div>

           
            {!isCompleting && (
                <div className='task-btns'>
                <button className="option-btn edit" onClick={handleEdit} ><MdOutlineEdit></MdOutlineEdit></button>
                {!taskCompleted && (
                <button className="option-btn delete" onClick={handleDelete}><RxCross2></RxCross2></button>
                    )}
                </div>
            )}


        </div>
    )
}
