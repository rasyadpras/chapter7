const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const Sentry = require('@sentry/node');
const {
    sendResetPassword,
    sendChangePasswordSuccess
} = require('../libs/mailer');
const { ResponseTemplate } = require('../template/response');

async function getUser(req, res) {
    try {
        const { name } = req.query;
        const payload = {}

        if (name) {
            payload.name = name
        }

        const user = await prisma.users.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            },
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true
            },
        })
        let resp = ResponseTemplate(user, 'get data success', null, 200);
        return res.status(200).json(resp);
    } catch (error) {
        Sentry.captureException(error);
        let resp = ResponseTemplate(null, 'internal server error', null, 500);
        return res.status(500).json(resp);
    }
};

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        const user = await prisma.users.findUnique({ where: { email: email } });
        if (!user) {
            return res.json({message: 'email is not registered'})
        };

        await sendResetPassword(email);
        return res.json({message: 'email sent. check your inbox'})
    } catch (error) {
        Sentry.captureException(error);
        return error;
    }
};

async function resetPassword(req, res) {
    try {
        const { email, password } = req.body;
        const hashPass = await bcrypt.hash(password, 10);
        await prisma.users.update({
            where: {
                email: email
            },
            data: {
                password: hashPass
            }
        });
        await sendChangePasswordSuccess(email);
        let response = ResponseTemplate(null, 'reset password success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        Sentry.captureException(error);
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function updateUser(req, res) {
    const { name, email } = req.body;
    const { id } = req.params;
    const payload = {};

    if (!name && !email) {
        let response = ResponseTemplate(null, 'bad request', error, 400);
        return res.status(400).json(response);
    }

    if (name) {
        payload.name = name
    }
    if (email) {
        payload.email = email
    }

    try {
        const findUser = await prisma.users.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!findUser) {
            let response = ResponseTemplate(null, 'user not found', error, 404);
            return res.status(404).json(response);
        };

        const user = await prisma.users.update({
            where: {
                id: Number(id)
            },
            data: payload,
        });
        let response = ResponseTemplate(user, 'update data success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        Sentry.captureException(error);
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

module.exports = {
    getUser,
    forgotPassword,
    resetPassword,
    updateUser
}