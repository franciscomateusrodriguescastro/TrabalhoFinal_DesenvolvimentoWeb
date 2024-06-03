document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('http://localhost:3000/users');
        const users = response.data;

        const userTable = document.getElementById('userTable');
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${new Date(user.birthdate).toLocaleDateString('pt-BR')}</td>
            `;
            userTable.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
});