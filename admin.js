// Função para carregar os usuários cadastrados na tabela
async function loadUsers() {
    try {
        const response = await axios.get('http://exemplo.com/api/users');
        const userList = document.getElementById('userList');

        userList.innerHTML = ''; // Limpa a tabela antes de adicionar os usuários

        response.data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editUser(${user.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Excluir</button>
                </td>
            `;
            userList.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        alert('Erro ao carregar usuários. Tente novamente mais tarde.');
    }
}

// Função para editar um usuário
async function editUser(userId) {
    // Implemente a lógica de edição de usuário conforme necessário
    alert('Função de edição de usuário não implementada.');
}

// Função para excluir um usuário
async function deleteUser(userId) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            await axios.delete(`http://exemplo.com/api/users/${userId}`);
            alert('Usuário excluído com sucesso!');
            loadUsers(); // Recarrega a tabela após a exclusão
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            alert('Erro ao excluir usuário. Tente novamente mais tarde.');
        }
    }
}

// Carrega os usuários ao carregar a página
window.onload = loadUsers;
