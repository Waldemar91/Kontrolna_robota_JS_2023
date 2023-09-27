���� post-details.js

const postDetailsDiv = document.getElementById("post-details");
const postCommentsDiv = document.getElementById("post-comments");

// ������� ��� ��������� ID ����� � ��������� URL
function getPostIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// ������� ��� ��������� �� ����������� ������� �����
function getPostDetails() {
    const postId = getPostIdFromURL();

    if (postId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => response.json())
            .then(post => {
                displayPostDetails(post);
                getPostComments(postId);
            })
            .catch(error => console.error('�������:', error));
    } else {
        postDetailsDiv.innerHTML = "����� �� ��������.";
    }
}

// ������� ��� ����������� ������� �����
function displayPostDetails(post) {
    postDetailsDiv.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
}

// ������� ��� ��������� �� ����������� ��������� �� �����
function getPostComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            displayPostComments(comments);
        })
        .catch(error => console.error('�������:', error));
}

// ������� ��� ����������� ��������� �� �����
function displayPostComments(comments) {
    postCommentsDiv.innerHTML = "<h3>��������:</h3>";
    comments.forEach(comment => {
        const commentBlock = document.createElement("div");
        commentBlock.innerHTML = `<p><strong>${comment.name}</strong></p><p>${comment.body}</p>`;
        commentBlock.className = "post-commentar";
        postCommentsDiv.appendChild(commentBlock);
    });
}

// ������ ������� ��� ��������� �� ����������� ������� ����� ��� ������������ �������
getPostDetails();

