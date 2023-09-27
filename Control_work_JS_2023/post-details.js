const postDetailsDiv = document.getElementById("post-details");
const postCommentsDiv = document.getElementById("post-comments");

// Функція для отримання ID поста з параметрів URL
function getPostIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// Функція для отримання та відображення деталей поста
function getPostDetails() {
    const postId = getPostIdFromURL();

    if (postId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => response.json())
            .then(post => {
                displayPostDetails(post);
                getPostComments(postId);
            })
            .catch(error => console.error('Помилка:', error));
    } else {
        postDetailsDiv.innerHTML = "Поста не знайдено.";
    }
}

// Функція для відображення деталей поста
function displayPostDetails(post) {
    postDetailsDiv.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
}

// Функція для отримання та відображення коментарів до поста
function getPostComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            displayPostComments(comments);
        })
        .catch(error => console.error('Помилка:', error));
}

// Функція для відображення коментарів до поста
function displayPostComments(comments) {
    postCommentsDiv.innerHTML = "<h3>Коментарі:</h3>";
    comments.forEach(comment => {
        const commentBlock = document.createElement("div");
        commentBlock.innerHTML = `<p><strong>${comment.name}</strong></p><p>${comment.body}</p>`;
        commentBlock.className = "post-commentar";
        postCommentsDiv.appendChild(commentBlock);
    });
}

// Виклик функції для отримання та відображення деталей поста при завантаженні сторінки
getPostDetails();

