const button = document.querySelector('button');
const container = document.querySelector('.container');

button.addEventListener('click', () => {

    createNotification();
});

function createNotification() {
    const display = document.createElement('div');
    display.classList.add('toast');   
    display.textContent = `Merry Christmas & Happy New Year`;

    container.appendChild(display);

    setTimeout(() => {
        display.remove();
    }, 3000);

}