document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let messageElement = document.getElementById('message');

    fetch('https://66e7e68bb17821a9d9da6e50.mockapi.io/login')
        .then(response => response.json())
        .then(users => {
            let user = users.find(user => user.email === email && user.password === password);

            if (user) {
                sessionStorage.setItem('userId', user.id);
                sessionStorage.setItem('userName', user.name);
                sessionStorage.setItem('userEmail', user.email);

                window.location.href = `home.html`;
            } else {
                messageElement.textContent = 'Wrong email or password.';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
