const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware para processar JSON diretamente no Express
app.use(express.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Insira a senha do MySQL, se necessário
    database: 'ifmt_database',
});

// Conexão com o banco
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit();
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para registrar usuário
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Verifica se o e-mail já existe
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }

        // Insere o usuário no banco
        db.query(
            'INSERT INTO usuarios (email, password) VALUES (?, ?)',
            [email, password],
            (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao registrar usuário' });
                }
                res.status(201).json({ message: 'Usuário registrado com sucesso' });
            }
        );
    });
});

// Rota para login de usuário
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Busca o usuário no banco
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (results.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const user = results[0];

        // Compara diretamente a senha enviada com a armazenada (sem hashing)
        if (password !== user.password) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        res.status(200).json({ message: 'Login realizado com sucesso', user: { id: user.id, email: user.email } });
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
