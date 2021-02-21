const text = `Hi there! I bet you're having a good time? Bless up!!!    `;

let index = 0;      // represents index of each letter in the text

function writeText() {

    document.body.textContent = text.slice(0, index);  // append text to the body using the slice method and the index of the text
     
    index++;        // increase the index to fetch new letter

    if (index > text.length) {
        index = 0;
    }
}

setInterval(writeText, 100);    // add timer
