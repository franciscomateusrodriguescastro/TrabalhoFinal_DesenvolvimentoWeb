// Função para carregar os usuários cadastrados na tabela
async function loadUsers() {
    try {
        const response = await axios.get('http://localhost:3000/register');
        displayUsers(response.data);
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        alert('Erro ao carregar usuários. Tente novamente mais tarde.');
    }
}

// Função para exibir os usuários na tabela
function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Limpa a tabela antes de adicionar os usuários

    users.forEach(user => {
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
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            alert('Usuário excluído com sucesso!');
            loadUsers(); // Recarrega a tabela após a exclusão
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            alert('Erro ao excluir usuário. Tente novamente mais tarde.');
        }
    }
}

// Função para salvar os dados do cadastro
async function saveUser(event) {
    event.preventDefault(); // Evita o envio do formulário de forma padrão

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    try {
        const response = await axios.post('http://localhost:3000/register', {
            username: username,
            email: email
        });
        alert('Usuário cadastrado com sucesso!');
        loadUsers(); // Recarrega a tabela após o cadastro
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
    }
}

// Carrega os usuários ao carregar a página

// Adiciona o evento de submit ao formulário de cadastro
document.getElementById('registerForm').addEventListener('submit', saveUser);
