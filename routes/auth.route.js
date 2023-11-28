const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { checkRegister } = require('../middlewares/middleware');
const router = express.Router();

router.post('/register', checkRegister, register);
router.post('/login', login);

module.exports = router;