document.addEventListener('DOMContentLoaded', () => {
    // Event listener para o formulário de cadastro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await axios.post('http://localhost:5000/api/register', { username, email, password });
                alert(response.data.message);
                window.location.href = 'login.html'; // Redirecionar para a página de login após cadastro
            } catch (error) {
                alert('Erro ao cadastrar usuário: ' + error.response.data.message);
            }
        });
    }

    // Event listener para o formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await axios.post('http://localhost:5000/api/login', { email, password });
                localStorage.setItem('token', response.data.token); // Armazenar o token JWT no localStorage
                window.location.href = 'admin.html'; // Redirecionar para a página de administração após login
            } catch (error) {
                alert('Erro ao fazer login: ' + error.response.data.message);
            }
        });
    }

    // Carregar dados na tela de gestão administrativa
    const usersTable = document.getElementById('usersTable');
    if (usersTable) {
        loadUsers();

        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }
});

// Função para carregar usuários na tela de gestão administrativa
async function loadUsers() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }

    try {
        const response = await axios.get('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${token}` }
        });

        const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
        usersTable.innerHTML = ''; // Limpar tabela antes de preencher

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
}

// Função para editar usuário
async function editUser(userId) {
    const username = prompt('Novo nome de usuário:');
    const email = prompt('Novo email:');
    if (username && email) {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/user/${userId}`, { username, email }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Usuário atualizado com sucesso');
            loadUsers(); // Recarregar usuários
        } catch (error) {
            alert('Erro ao atualizar usuário: ' + error.response.data.message);
        }
    }
}

// Função para excluir usuário
async function deleteUser(userId) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Usuário excluído com sucesso');
            loadUsers(); // Recarregar usuários
        } catch (error) {
            alert('Erro ao excluir usuário: ' + error.response.data.message);
        }
    }
}
