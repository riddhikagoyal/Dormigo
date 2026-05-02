// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            errorMessage.textContent = 'Both fields are required.';
            shakeInputFields();
        } else {
            errorMessage.textContent = '';
            // Here you can handle actual login logic (e.g., send a request to the server)
            showSuccessMessage();
        }
        
    });

    function shakeInputFields() {
        usernameInput.classList.add('shake');
        passwordInput.classList.add('shake');
        setTimeout(() => {
            usernameInput.classList.remove('shake');
            passwordInput.classList.remove('shake');
        }, 500);
    }

    function showSuccessMessage() {
        alert('Login successful!');
        // Redirect or perform other actions
    }
});



