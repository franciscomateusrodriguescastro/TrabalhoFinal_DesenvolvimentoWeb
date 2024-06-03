document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            birthdate: formData.get('birthdate'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        try {
            const response = await axios.post('http://localhomongodb://127.0.0.1:27017/clientesCollection?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6st:3000/api/register', data);
            if (response.status === 200) {
                alert('Usuário cadastrado com sucesso!');
                registerForm.reset();
            } else {
                alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao carregar usuários. Tente novamente mais tarde.');
        }
    });
});
