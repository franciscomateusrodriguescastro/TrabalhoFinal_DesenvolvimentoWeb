document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('mongodb+srv://mateus:dbmateus99@cluster0.1mwlztn.mongodb.net/', { email, password });
        localStorage.setItem('token', response.data.token);
        window.location.href = 'admin.html';
    } catch (error) {
        alert('Erro ao fazer login: ' + error.response.data.message);
    }
});
