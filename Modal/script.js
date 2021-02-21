const open = document.querySelector('.open');
const close = document.querySelector('.close');
const popup = document.querySelector('.popup-container');


open.addEventListener('click', () => {
    popup.classList.add('active');
});

close.addEventListener('click', () => {
    popup.classList.remove('active');
});
