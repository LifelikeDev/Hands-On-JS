const container = document.getElementById('container');
const img = document.querySelector('img');

console.log(document.event);

document.body.addEventListener('DOMContentLoaded', () => {
    alert('Welcome to this fun zoom effect of image');
});

container.addEventListener('mousemove', e => {
     
    // get x and y value which will be used to scale the image
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
   
    // employ x and y values to zoom and scale the image by their values
    img.style.transformOrigin = `${x}px ${y}px`;
    img.style.transform = `scale(2)`;
});

    // reset img on mouseleave
container.addEventListener('mouseleave', e => {

    img.style.transformOrigin = `center center`;
    img.style.transform = `scale(1)`;
});