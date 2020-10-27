const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'mysql',
    password: '#abc$878da454',
    database: 'athon'
});

module.exports = conexao
