// script.js
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]{7,}$/;
    return usernameRegex.test(username);
}

function toggleLoginButton() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginButton = document.getElementById('loginButton');

    if (username.length > 0 && password.length > 0) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

document.getElementById('username').addEventListener('input', toggleLoginButton);
document.getElementById('password').addEventListener('input', toggleLoginButton);

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const status = document.getElementById('status');

    if (!validateUsername(username)) {
        status.textContent = 'Invalid username. Must be one word, more than 6 alphanumerical characters.';
        status.style.color = 'red';
        return;
    }

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    
    if (result.success) {
        status.textContent = 'Login successful!';
        status.style.color = 'green';
    } else {
        status.textContent = 'Invalid username or password.';
        status.style.color = 'red';
    }
});

module.exports = { validateUsername };
