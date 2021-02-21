
window.addEventListener('keydown', e => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    // console.log(audio);
    if ( e.keyCode = audio ) {
        audio.currentTime = 0;      // set sound to always play from the beginning
        audio.play();           // play sound
    } else {
        return null;        // display nothing
    }
    key.classList.add('playing');   // add the styles of the class to it
});

const keys = document.querySelectorAll('.key');

keys.forEach(key => {

    // listen for TransitionEnd property on each key 

    key.addEventListener('transitionend', e => {
        
        if (e.propertyName === 'transform') {
            key.classList.remove('playing');
        } else {
            return null;
        };
    })
});