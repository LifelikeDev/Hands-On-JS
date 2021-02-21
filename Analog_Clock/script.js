const hand = document.querySelector('.hand');
const secHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

function getTime() {
    const time = new Date();
    const secs = time.getSeconds();
    const clockSecs = ((secs / 60) * 360) + 90;
    secHand.style.transform = `rotate(${clockSecs}deg)`;

    const mins = time.getMinutes();
    const clockMins = ((mins / 60) * 360) + 90;
    minHand.style.transform = `rotate(${clockMins}deg)`;

    const hours = time.getHours();
    const clockHrs = ((hours / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${clockHrs}deg)`;
}

setInterval(getTime, 1000);