const images = document.querySelector('.imgs-container');
const img = document.querySelectorAll('img');
    
    // set index to 0
let index = 0;

    // create a function called scroll() or whatever
function scroll() {
    index++;        // increase the value of index before the rest of the code runs

    if (index > img.length - 1) {
        index = 0;      // if greater, set index back to zero
    }

        // use JS to set the translate property 
    images.style.transform = `translateX(${-index * 30}em)`;

}

setInterval(scroll, 3000);
