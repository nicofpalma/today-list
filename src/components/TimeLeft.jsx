import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

export default function TimeLeft(){
    const [timeLeft, setTimeLeft] = useState('00hs 00m 00s');
    const [percentage, setPercentage] = useState(0);
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

    const calculatePercentage = () => {
        const timeNow = new Date();
        const midnight = new Date().setHours(0, 0, 0, 0);
        const diff = timeNow - midnight;
        const totalMsInDay = 24 * 60 * 60 * 1000;

        const percentage = (diff / totalMsInDay) * 100;

        return parseFloat(percentage.toFixed(2)); 
    }

    useEffect(() => {
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 500);
        const percentageValue = setInterval(setPercentage(calculatePercentage()), 60000);

        return () => {
            clearInterval(timer);
            clearInterval(percentageValue);
        }; 
    }, []);

    return(
        <div className="box">
            <section>
                <div className="box-add">{timeLeft}</div>
                <div className="box-body">
                    <div className="progress-bar-container">
                    <ProgressBar 
                        className="progress-bar"
                        completed={percentage}
                        bgColor="var(--text-color)"
                        borderRadius="5px"
                        baseBgColor="var(--bg-color)"
                        labelColor="var(--bg-color)"
                        labelSize="10px"
                        transitionDuration=""
                        animateOnRender
                        maxCompleted={100}
                    />
                    </div>
                </div>
            </section>
        </div>
    )
}


// return(
//     <div className='time'>
//         <h4 style={{
//             color: color
//         }}>
//             {timeLeft} left
//         </h4>
        
//     </div>
// )