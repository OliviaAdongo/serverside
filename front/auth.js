// Display error messages
function displayError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Switch between signup and login forms
function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function showSignupForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

// Signup functionality
document.getElementById('signup').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (!username || !password) {
        displayError('signup-error', 'Both fields are required.');
        return;
    }

    // Save user data in localStorage
    const existingUser = localStorage.getItem(username);

    if (existingUser) {
        displayError('signup-error', 'Username already exists.');
    } else {
        localStorage.setItem(username, JSON.stringify({ username, password }));
        alert('Signup successful! You can now log in.');
        showLoginForm();
    }
});

// Login functionality
document.getElementById('login').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        displayError('login-error', 'Both fields are required.');
        return;
    }

    const user = localStorage.getItem(username);

    if (!user) {
        displayError('login-error', 'User does not exist.');
    } else {
        const userData = JSON.parse(user);
        if (userData.password === password) {
            alert('Login successful!');
            // Redirect to another page or show protected content
        } else {
            displayError('login-error', 'Incorrect password.');
        }
    }
});
