const userListDiv = document.getElementById("user-list");

// Функція для отримання списку користувачів
function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            displayUsers(users);
        })
        .catch(error => console.error('Помилка:', error));
}

// Функція для відображення користувачів на сторінці
function displayUsers(users) {
    users.forEach(user => {
        const userBlock = document.createElement("div");
        userBlock.innerHTML = `<p>ID: ${user.id}</p><p>Name: ${user.name}</p>`;
        userBlock.className = "user-block";

        const detailsButton = document.createElement("a");
        detailsButton.href = `user-details.html?id=${user.id}`;
        detailsButton.textContent = "Деталі";
        detailsButton.className = "show-user";

        userBlock.appendChild(detailsButton);
        userListDiv.appendChild(userBlock);
    });
}
// Виклик функції для отримання користувачів при завантаженні сторінки
getUsers();