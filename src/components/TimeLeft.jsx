import { useEffect, useState } from "react";

export default function TimeLeft(){
    const [timeLeft, setTimeLeft] = useState('00hs 00m 00s');
    const [color, setColor] = useState('var(--red)');

    const calculateTimeLeft = () => {
        const timeNow = new Date();
        const midnight = new Date();

        midnight.setHours(24, 0, 0, 0);

        const diff = midnight - timeNow;

        const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

        setTimeLeft(`${hours}hs ${minutes}m ${seconds}s`);

        if(hours >= 12){
            setColor('var(--green)');
        } else if(hours >= 8){
            setColor('var(--orange)');
        } else {
            setColor('var(--red)');
        }
    };

    useEffect(() => {
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 500);

        return () => clearInterval(timer);
    }, []);

    return(
        <div className='time'>
            <h4 style={{
                color: color
            }}>
                {timeLeft} left
            </h4>
        </div>
    )
}