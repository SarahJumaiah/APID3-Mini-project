let tit = document.getElementById("tit");
let txt = document.getElementById("txtarea");
let imgUrl = document.getElementById("imgUrl");
let btn = document.getElementById("addb");
let blogsContainer = document.getElementById("blogsContainer");

function renderCard(data) {
    let container = document.createElement('div');
    container.classList.add('col-md-4', 'mb-4');

    let card = document.createElement('div');
    card.classList.add('card');

    if (data.imageUrl) {
        let image = document.createElement('img');
        image.classList.add('card-img-top');
        image.src = data.imageUrl;
        image.alt = 'Blog Image';
        card.appendChild(image);
    }

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let title = document.createElement('h5');
    title.classList.add('card-text');
    title.innerText = data.title;

    let content = document.createElement('p');
    content.classList.add('card-text');
    content.innerText = data.blog;

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.innerText = 'Delete';

    deleteBtn.addEventListener('click', () => {
        fetch(`https://66e7e68bb17821a9d9da6e50.mockapi.io/blog/${data.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(() => container.remove());
    });

    cardBody.appendChild(title);
    cardBody.appendChild(content);
    cardBody.appendChild(deleteBtn);
    card.appendChild(cardBody);
    container.appendChild(card);
    blogsContainer.appendChild(container);
}

window.addEventListener('DOMContentLoaded', () => {
    fetch("https://66e7e68bb17821a9d9da6e50.mockapi.io/blog")
        .then(response => response.json())
        .then(data => data.forEach(item => renderCard(item)));
});

btn.addEventListener("click", () => {
    if (tit.value.trim() === "" || txt.value.trim() === "") {
        alert("Title and content are required.");
        return;
    }

    let imageUrlValue = imgUrl.value.trim();

    fetch("https://66e7e68bb17821a9d9da6e50.mockapi.io/blog", {
        method: 'POST',
        body: JSON.stringify({
            title: tit.value,
            blog: txt.value,
            imageUrl: imageUrlValue
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(response => response.json())
    .then(data => renderCard(data));

    txt.value = '';
    tit.value = '';
    imgUrl.value = '';
});
