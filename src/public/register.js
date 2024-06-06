document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const birthdate = document.getElementById('birthdate').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        axios.post('/register', { username, email, birthdate, password })
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    window.location.href = 'login.html';
                } else {
                    alert('Registration failed: ' + response.data.message);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    });
});
