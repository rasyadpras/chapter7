require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/route');
const Sentry = require('@sentry/node');

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

Sentry.init({
    dsn: process.env.DSN,
    tracesSampleRate: 1.0,
});

app.use('/', router)

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));