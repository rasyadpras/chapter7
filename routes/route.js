const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const { forgotPassword, resetPassword } = require('../controllers/user.controller');
const { checkValidateEmail, checkResetPass } = require('../middlewares/middleware');

router.use(morgan('dev'));

router.use('/', authRoute);
router.use('/user', userRoute);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);

module.exports = router;