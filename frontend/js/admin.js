document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }

    try {
        const response = await axios.get('mongodb+srv://mateus:dbmateus99@cluster0.1mwlztn.mongodb.net/', {
            headers: { Authorization: `Bearer ${token}` }
        });

        const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
        response.data.forEach(user => {
            const row = usersTable.insertRow();
            row.insertCell(0).textContent = user.username;
            row.insertCell(1).textContent = user.email;

            const actionsCell = row.insertCell(2);
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.className = 'btn';
            editBtn.addEventListener('click', () => editUser(user._id));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.className = 'btn';
            deleteBtn.addEventListener('click', () => deleteUser(user._id));

            actionsCell.appendChild(editBtn);
            actionsCell.appendChild(deleteBtn);
        });
    } catch (error) {
        alert('Erro ao carregar usuários: ' + error.response.data.message);
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});

async function editUser(userId) {
    const username = prompt('Novo nome de usuário:');
    const email = prompt('Novo email:');
    if (username && email) {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`mongodb+srv://mateus:dbmateus99@cluster0.1mwlztn.mongodb.net/${userId}`, { username, email }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Usuário atualizado com sucesso');
            window.location.reload();
        } catch (error) {
            alert('Erro ao atualizar usuário: ' + error.response.data.message);
        }
    }
}

async function deleteUser(userId) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`mongodb+srv://mateus:dbmateus99@cluster0.1mwlztn.mongodb.net/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Usuário excluído com sucesso');
            window.location.reload();
        } catch (error) {
            alert('Erro ao excluir usuário: ' + error.response.data.message);
        }
    }
}
