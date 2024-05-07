document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://exemplo.com/api/register', { username, password });
        console.log(response.data);
        alert('Usuário cadastrado com sucesso!');
        // Redirecionar para a página de login após o cadastro
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
    }
});
