document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const birthdate = document.getElementById('birthdate').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/register', {
            username,
            email,
            birthdate,
            password
        });
        alert(response.data);
    } catch (error) {
        alert('Erro ao cadastrar usuário: ' + error.message);
    }
});
