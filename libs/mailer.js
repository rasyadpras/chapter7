require('dotenv').config();
const nodemailer = require('nodemailer');
const { resetPasswordMailBody, welcomeMailBody } = require('../template/bodymail');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    },
});

const sendResetPassword = async (email) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset Password',
        html: resetPasswordMailBody,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(info.response);
    console.log('Email sent to: ' + info.envelope.to);
    return info;
};

const sendWelcome = async (email) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Welcome',
        html: welcomeMailBody,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(info.response);
    console.log('Email sent to: ' + info.envelope.to);
    return info;
};

module.exports = {
    sendWelcome,
    sendResetPassword,
}