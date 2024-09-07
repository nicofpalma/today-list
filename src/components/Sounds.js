const sounds = [
    { name: 'done', audio: new Audio('src/sounds/done.mp3') },
    { name: 'delete', audio: new Audio('src/sounds/delete.mp3') },
];

export function playSound(soundName){
    const sound = sounds.find(s => s.name === soundName);
    if(sound){
        sound.audio.volume = 0.5;
        sound.audio.currentTime = 0;
        sound.audio.play().catch(error => {
            console.error(`Error reproducing the sound "${soundName}"`, error);
        });
    } else {
        console.error(`The sound "${soundName}" dont exists`);
    }


} 