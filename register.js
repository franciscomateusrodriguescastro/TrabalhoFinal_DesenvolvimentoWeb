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
            const response = await axios.post('URL_DA_SUA_API', data);
            alert('Usuário cadastrado com sucesso!');
            registerForm.reset();
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao carregar usuários. Tente novamente mais tarde.');
        }
    });
});
