require('marko/node-require').install();
require('marko/express');
const cors = require('cors');
const express = require('express');
const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
});
const rotas = require('../app/rotas/rotas.js');
rotas(app);

module.exports = app;