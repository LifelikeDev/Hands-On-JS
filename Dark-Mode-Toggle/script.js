const toggleTheme = document.querySelector('input');
const body = document.querySelector('body');
const label = document.querySelector('label');

toggleTheme.addEventListener('change', e => {

        // attach class 'dark' to the body which will be configured in CSS to possess dark theme properties
    document.body.classList.toggle('dark', e.target.checked);

    if (document.body.classList.contains('dark')) {
        label.innerText = `Light Mode`;
    } else {
        label.innerText = `Dark Mode`;
    }
    
});

// function labelChange() {
//     const label = document.querySelector('label');

//     if (document.body.style.background === '#fff') {
//         label.innerText = `Dark Mode`;
//     } else if (document.body.style.background === '#1f1f1f') {
//         label.innerText = `Light Mode`;
//     } 
// }