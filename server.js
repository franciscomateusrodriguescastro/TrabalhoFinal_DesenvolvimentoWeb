const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const port = 3000;

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://mateus:dbmateus99@cluster0.1mwlztn.mongodb.net/', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    birthdate: Date,
    password: String
});

const User = mongoose.model('User', userSchema);

app.use(cors(express.static(__dirname)));
app.use(bodyParser.json());

// Rota para registrar um novo usuário
app.post('/register', async (req, res) => {
    try {
        const { username, email, birthdate, password } = req.body;
        const newUser = new User({ username, email, birthdate, password });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Rota para listar todos os usuários
app.get('/register', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Rota para excluir um usuário
app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Usuário excluído com sucesso!' });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log("mongodb+srv://mateus:dbmateus99@cluster0.1mwlztn.mongodb.net/");
});
