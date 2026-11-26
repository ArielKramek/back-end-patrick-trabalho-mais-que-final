const mysql = require('mysql2/promise');

// Configurações do banco de dados
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'biblioteca',
});

module.exports = db;
