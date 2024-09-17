document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let messageElement = document.getElementById('message');

    if (name.length <= 5) {
        messageElement.textContent = 'Name must include more than 5 characters.';
        return;
    }

    if (password.length <= 8) {
        messageElement.textContent = 'Password must include more than 8 characters.';
        return;
    }

    fetch('https://66e7e68bb17821a9d9da6e50.mockapi.io/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        messageElement.textContent = 'Redirecting to login...';
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    })
});
