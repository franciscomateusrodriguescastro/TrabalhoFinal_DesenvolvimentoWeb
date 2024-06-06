const express = require('express');
const { createUser, updateUser, deleteUser, getUsers } = require('../controllers/userController');
const router = express.Router();
const { loginUser } = require('../controllers/userController');
const auth = require('../middleware/auth');


router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getUsers);
router.post('/login', loginUser);
// Rotas Protegidas
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.get('/', auth, getUsers);

module.exports = router;
