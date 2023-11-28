const express = require('express');
const { getUser, updateUser, forgotPassword } = require('../controllers/user.controller');
const { checkValidateEmail } = require('../middlewares/middleware');
const router = express.Router();

router.get('/', getUser);
router.put('/:id', updateUser);
router.put('/forgotpassword', checkValidateEmail, forgotPassword);


module.exports = router;