document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        axios.post('/login', { username, password })
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    window.location.href = 'admin.html';
                } else {
                    alert('Login failed: ' + response.data.message);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    });
});
