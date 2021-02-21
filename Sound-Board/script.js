const sounds = ['soprano', 'alto', 'tenor', 'bass'];

sounds.forEach(sound => {

const button = document.createElement('button');
button.classList.add('button');
button.innerText = sound;
document.body.appendChild(button);

button.addEventListener('click', () => {

    stopSound();

    document.getElementById(sound).play();

})


});

function stopSound() {
    sounds.forEach(sound => {
        const song = document.getElementById(sound);

        song.pause();
        song.currentTime = 0;
    });   
}