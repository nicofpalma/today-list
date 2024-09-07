/* eslint-disable react/prop-types */
import { MdOutlineEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { PiCheckFatFill } from "react-icons/pi";
import { useTranslation } from 'react-i18next';
import { RiDeleteBin2Fill } from "react-icons/ri";
import i18n from '../i18n';
import { playSound } from "./Sounds";


export default function Task({taskName, onDelete, id}){
    const [taskDeleted, setTaskDeleted] = useState(false); 
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [timeAdded, setTimeAdded] = useState('00:00:00');
    const [timeDone, setTimeDone] = useState('00:00:00');
    const [isEditing, setIsEditing] = useState(false);
    const editInputRef = useRef(null);
    const [editedName, setEditedName] = useState('');
    const { t } = useTranslation();

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

    useEffect(() => {
        if(isEditing && editInputRef.current){
            editInputRef.current.focus();
        }
    }, [isEditing]);

    if(taskDeleted){
        onDelete(id);
    }

    const handleTaskCompleted = () => {
        if(isEditing){
            handleConfirmEdit();
            return;
        }

        if(!taskCompleted){
            setIsCompleting(true);
            setTimeDone(getActualTime());
            setTaskCompleted(true);

            playSound('done');
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
        if(isEditing){
            handleConfirmEdit();
            return;
        }
        setIsEditing(true);
    }

    const handleDelete = (e) => {        
        e.stopPropagation();
        setIsDeleting(true);
        setTimeout(() => {
            setTaskDeleted(!taskDeleted);
        }, 1000);
        playSound('delete');
    }

    const handleEditInputClick = (e) => {
        e.stopPropagation();
    }

    const handleConfirmEdit = () => {       
        const newName = editInputRef.current.value.trim();
        if(newName !== ''){
            setEditedName(newName);
            setIsEditing(false);
        }
    }

    return (
        <div 
            className={`task-box 
                ${taskCompleted ? 'completed' : ''} 
                ${taskDeleted ? 'deleted' : ''}
                ${isCompleting ? 'completing' : ''}
                ${isDeleting ? 'deleting' : ''}`
            } 
            onClick={handleTaskCompleted}
        >
            {isCompleting && (
                <PiCheckFatFill></PiCheckFatFill>
            )}

            {isDeleting && (
                <RiDeleteBin2Fill className="delete-icon"></RiDeleteBin2Fill>
            )}

            <div className='task-content'>
                <div className='task-text'>
                    {isEditing ? 
                        <input 
                            ref={editInputRef}
                            className="edit-input" 
                            onClick={handleEditInputClick}
                            onKeyDown={(e) => e.key === 'Enter' && handleConfirmEdit()}
                            defaultValue={editedName === '' ? taskName : editedName}
                        >
                        </input>
                     :
                        <p className={`${taskCompleted ? 'done' : ''}`}>{editedName === '' ? taskName : editedName}</p>
                    }
 
                    <p className='time-added'>{t('Added')}: {timeAdded}</p>
                    {taskCompleted && (
                        <p className='time-added'>{t('Done')}: {timeDone}</p>
                    )}
                </div>
            </div>

           
            {!isCompleting && (
                <div className='task-btns'>
                <button className="option-btn edit" onClick={handleEdit} ><MdOutlineEdit></MdOutlineEdit></button>
      
                <button className="option-btn delete" onClick={handleDelete}><RxCross2></RxCross2></button>
          
                </div>
            )}


        </div>
    )
}
