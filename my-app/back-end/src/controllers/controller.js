import db from '../config/db.js'

function Users(req, res) {
    res.status(200).json({ message: "Oi moh moh" });
}

// Rota para login de usuário
function login(req, res) {
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

        res.status(200).json({ message: 'Login realizado com sucesso', user: { id: user.id, email: user.email, adm: user.adm } });
    });
};

function cadastro(req, res) {
    const { name, email, password, roomNumber } = req.body;

    // Verifica se o e-mail já existe
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }

        // Insere o usuário no banco de dados
        db.query(
            'INSERT INTO usuarios (name, email, password, roomNumber) VALUES (?,?,?,?)',
            [name, email, password, roomNumber],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao registrar usuário' });
                }

                // Recupera o usuário recém-inserido para retornar na resposta
                const userId = result.insertId; // ID do novo usuário inserido
                res.status(201).json({
                    message: 'Cadastro realizado com sucesso',
                    user: { id: userId, email, roomNumber }
                });
            }
        );
    });
};

function salvarRespostas(req, res) {
    const { userId, roomNumber, respostas } = req.body;

    if (!userId || !roomNumber || !respostas || !Array.isArray(respostas)) {
        return res.status(400).json({ message: 'Dados inválidos.' });
    }

    const query = `
        INSERT INTO respostas (user_id, sala, pergunta_id, pergunta, expectativa, realidade) 
        VALUES ?`;
    
    // Mapeia as respostas em formato compatível para inserção
    const values = respostas.map((resp) => [
        userId,
        roomNumber,
        resp.id,
        resp.pergunta,
        resp.expectativa,
        resp.realidade
    ]);

    db.query(query, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao salvar respostas.' });
        }

        res.status(201).json({ message: 'Respostas salvas com sucesso.' });
    });
}

export default { Users, login, cadastro, salvarRespostas }