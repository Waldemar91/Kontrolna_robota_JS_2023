const userDetailsDiv = document.getElementById("user-details");
const showPostsButton = document.getElementById("show-posts");
const userPostsDiv = document.getElementById("user-posts");

// Функція для отримання ID користувача з параметрів URL
function getUserIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// Функція для отримання та відображення деталей користувача
function getUserDetails() {
    const userId = getUserIdFromURL();

    if (userId) {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                displayUserDetails(user);
            })
            .catch(error => console.error('Помилка:', error));
    } else {
        userDetailsDiv.innerHTML = "Користувача не знайдено.";
    }
}

// Функція для відображення постів користувача
function showUserPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
            displayUserPosts(posts);
        })
        .catch(error => console.error('Помилка:', error));
}

// Функція для відображення деталей користувача
function displayUserDetails(user) {
    const userBlock = document.createElement("div");
    userDetailsDiv.innerHTML = `<p>ID: ${user.id}</p><p>Name: ${user.name}</p><p>Email: ${user.email}</p><p>Phone: ${user.phone}</p>`;

    userDetailsDiv.appendChild(userBlock);
}

// Функція для відображення постів користувача
function displayUserPosts(posts) {
    userPostsDiv.innerHTML = "";
    posts.forEach(post => {
        const postBlock = document.createElement("div");
        postBlock.innerHTML = `<p class="post-title">Title: ${post.title}</p>`;
        postBlock.className = "post-block";

        const detailsButton = document.createElement("a");
        detailsButton.href = `post-details.html?id=${post.id}`;
        detailsButton.textContent = "Деталі поста";
        detailsButton.className = "post-details-btn";

        postBlock.appendChild(detailsButton);
        userPostsDiv.appendChild(postBlock);
    });
}

// Обробник події для кнопки "Показати пости"
showPostsButton.addEventListener("click", () => {
    const userId = getUserIdFromURL();
    if (userId) {
        showUserPosts(userId);
    }
});
// Виклик функції для отримання та відображення деталей користувача при завантаженні сторінки
getUserDetails();