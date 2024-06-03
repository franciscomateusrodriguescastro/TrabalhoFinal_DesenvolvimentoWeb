const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/usersDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    birthdate: Date,
    password: String
});

const User = mongoose.model('User', userSchema);

// Rota para cadastro de usuário
app.post('/register', async (req, res) => {
    const { username, email, birthdate, password } = req.body;
    const user = new User({ username, email, birthdate, password });
    try {
        await user.save();
        res.status(201).send('Usuário cadastrado com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao cadastrar usuário: ' + error.message);
    }
});

// Rota para retornar todos os usuários
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Erro ao buscar usuários: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
