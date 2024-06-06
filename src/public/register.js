document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('/api/users', { name, email, password });
        if (response.status === 201) {
            alert('Usuário cadastrado com sucesso!');
            window.location.href = '/login.html';
        } else {
            alert('Erro ao cadastrar usuário. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Tente novamente.');
    }
});
