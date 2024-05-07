document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://exemplo.com/api/login', { username, password });
        console.log(response.data);
        // Redirecionar para a Tela de Gestão Administrativa se o login for bem-sucedido
        window.location.href = 'admin.html';
    } catch (error) {
        console.error('Erro ao realizar o login:', error);
        alert('Erro ao realizar o login. Verifique suas credenciais.');
    }
});
