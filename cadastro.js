document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://exemplo.com/api/usuarios', { name, email, password });
        console.log(response.data);
        alert('Usuário cadastrado com sucesso!');
        // Redirecionar para a página de login após o cadastro
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
        alert('Erro ao cadastrar o usuário.');
    }
});
