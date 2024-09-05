import { useState } from "react";
import { ImCross } from "react-icons/im";

export default function Check(){
    const [isChecked, setIsChecked] = useState(false);

    const handleCheck = () => {
        setIsChecked(!isChecked);
    }

    return(
        <button 
            className={`check ${isChecked ? 'checked' : ''}`}
            onClick={handleCheck}
            style={{
                width: '25px',
                height: '25px'
            }}
        >
            {isChecked && (
                <ImCross />
            )}
        </button>
    )
}