import mysql2 from 'mysql2';

// Configuração do banco de dados MySQL
const db = mysql2.createConnection({
    host: '',    // IP do servidor MySQL
    user: '',       // Usuário do MySQL
    password: '', // Senha do MySQL
    database: '',      // Nome do banco de dados
    port: ''              // Porta do MySQL 
});

// Conexão com o banco
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit();
    }
    console.log('Conectado ao banco de dados MySQL');
});

export default db;
