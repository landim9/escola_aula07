require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const session = require('express-session');
const cors = require('cors');

const router = require('./src/routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(session({
    secret: 'top', // Altere para um segredo forte em produção
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Defina como true se estiver usando HTTPS
}));

const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});