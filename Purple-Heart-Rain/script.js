    // create a function 

function heartRain() {
    // create a div
    const heart = document.createElement('div');
    // set text content
    heart.innerText = `💘`;
    // attach class to it so that it can be styled in css
    heart.classList.add('heart');
    // append to the body
    document.body.appendChild(heart);

    // set the left property to have a random value
    heart.style.left = Math.random() * 100 + `vw`;
    //set the animation duration to have a random value as well
    heart.style.animationDuration = Math.random() * 2 + 5 + `s`;

    // remove hearts after 5s
    setTimeout( () => {
        heart.remove();
    }, 5000)
}

// set loop 
setInterval(heartRain, 1000);