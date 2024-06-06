document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('/api/users/login', { email, password });
        if (response.data.success) {
            window.location.href = '/admin.html';
        } else {
            alert('Login falhou. Verifique suas credenciais.');
        }
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        alert('Erro ao realizar login. Tente novamente.');
    }
});
