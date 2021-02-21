const postWrapper = document.querySelector('#post-wrapper');
const filterPosts = document.querySelector('#filter');
const loading = document.querySelector('.loader');

let limit = 5;
let page = 1;

// fetching data from API...
const getPosts = async () => {
    const result = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await result.json();

    return data;
}

// Reveal Posts in the DOM
const revealPosts = async () => {
    const posts = await getPosts();

    posts.forEach(post => {
        const indivPost = document.createElement('div');
        indivPost.innerHTML = `
        <div class="post-content">
        <div class="post-number">${post.id}</div>
        <div class="post">
            <div class="post-heading">${post.title}</div>
            <div class="post-body">${post.body}</div>
        </div>
        </div>
        `;
        postWrapper.appendChild(indivPost);
    })
};

const loadMore = () => {
    loading.classList.add('reveal');

    // set timeout to remove loader and fetch more posts as you scroll down
    setTimeout(() => {
        loading.classList.remove('reveal');

        setTimeout(() => {
            page++;
            revealPosts();

        }, 300);

    }, 1000);
}

// filter posts upon query

filterPosts.addEventListener('input', e => {
    const typed = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post-content');

    posts.forEach(post => {

        // get the inner text of contents of post titles and post body-s
        const postTitle = post.querySelector('.post-heading').innerText.toUpperCase();
        const postBody = post.querySelector('.post-body').innerText.toUpperCase();

        // show post if typed content matches existing post 
        if (postTitle.indexOf(typed) > -1 || postBody.indexOf(typed) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });

});

revealPosts();


// listening for scroll event

window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5) {
        loadMore();
    }
});