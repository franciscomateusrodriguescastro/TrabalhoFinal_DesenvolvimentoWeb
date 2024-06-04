document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Navegação entre páginas
    const navigate = (page) => {
        switch (page) {
            case 'login':
                renderLogin();
                break;
            case 'register':
                renderRegister();
                break;
            case 'admin':
                renderAdmin();
                break;
            default:
                renderLandingPage();
        }
    };

    const renderLandingPage = () => {
        app.innerHTML = `
            <div class="container">
                <h1>Bem-vindo à Nossa Aplicação</h1>
                <button onclick="navigate('login')">Login</button>
                <button onclick="navigate('register')">Cadastro</button>
            </div>
        `;
    };

    const renderLogin = () => {
        app.innerHTML = `
            <div class="container">
                <h2>Login</h2>
                <form id="loginForm">
                    <input type="email" id="loginEmail" placeholder="Email" required>
                    <input type="password" id="loginPassword" placeholder="Senha" required>
                    <button type="submit">Entrar</button>
                </form>
                <button onclick="navigate('register')">Cadastro</button>
            </div>
        `;

        document.getElementById('loginForm').addEventListener('submit', handleLogin);
    };

    const renderRegister = () => {
        app.innerHTML = `
            <div class="container">
                <h2>Cadastro</h2>
                <form id="registerForm">
                    <input type="text" id="registerUsername" placeholder="Nome de Usuário" required>
                    <input type="email" id="registerEmail" placeholder="Email" required>
                    <input type="password" id="registerPassword" placeholder="Senha" required>
                    <button type="submit">Cadastrar</button>
                </form>
                <button onclick="navigate('login')">Login</button>
            </div>
        `;

        document.getElementById('registerForm').addEventListener('submit', handleRegister);
    };

    const renderAdmin = () => {
        app.innerHTML = `
            <div class="container">
                <h2>Gestão Administrativa</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome de Usuário</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="userTable">
                        <!-- Usuários serão inseridos aqui -->
                    </tbody>
                </table>
                <button onclick="logout()">Sair</button>
            </div>
        `;

        fetchUsers();
    };

    // Funções de navegação
    window.navigate = navigate;

    // Renderiza a página inicial
    navigate();

    // Event handlers
    async function handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('admin');
        } catch (error) {
            alert('Login falhou!');
        }
    }

    async function handleRegister(event) {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            await axios.post('/api/users/register', { username, email, password });
            navigate('login');
        } catch (error) {
            alert('Cadastro falhou!');
        }
    }

    function logout() {
        localStorage.removeItem('token');
        navigate('login');
    }

    async function fetchUsers() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const users = response.data;
            const userTable = document.getElementById('userTable');
            userTable.innerHTML = users.map(user => `
                <tr>
                    <td>${user._id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser('${user._id}')">Editar</button>
                        <button onclick="deleteUser('${user._id}')">Excluir</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            alert('Falha ao buscar usuários!');
        }
    }

    window.editUser = (id) => {
        // Função para editar usuário (não implementada neste exemplo)
    };

    window.deleteUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchUsers();
        } catch (error) {
            alert('Falha ao excluir usuário!');
        }
    };
});
