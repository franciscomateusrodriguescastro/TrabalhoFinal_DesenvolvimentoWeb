document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const userList = document.getElementById('userList');
    const pagination = document.getElementById('pagination');

    // Simulated user data
    const users = [
        { id: 1, username: 'Usuário 1' },
        { id: 2, username: 'Usuário 2' },
        { id: 3, username: 'Usuário 3' },
        // Adicione mais dados de usuário aqui
    ];

    function renderUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-danger btn-sm">Excluir</button>
                </td>
            `;
            userList.appendChild(tr);
        });
    }

    function filterUsers(query) {
        const filteredUsers = users.filter(user =>
            user.username.toLowerCase().includes(query.toLowerCase())
        );
        renderUsers(filteredUsers);
    }

    searchInput.addEventListener('input', function() {
        filterUsers(this.value);
    });

    renderUsers(users);

    // Pagination logic (if necessary)
});
