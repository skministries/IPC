Const express = require('express');
Const mysql = require('mysql2');
Const bodyParser = require('body-parser');
Const multer = require('multer');
Const bcrypt = require('bcryptjs');
Const path = require('path');

Const app = express();
Const port = 3000;

// Configuração da conexão com o MySQL
Const db = mysql.createConnection({
    Host: 'Skministires_Academy',
    User: 'Skministires',
    Password: 'sabino23',
    Database: 'mysql'
});

Db.connect((err) => {
    If(err) {
        Throw err;
    }
    Console.log('Conectado ao banco de dados MySQL');
});

// Configuração para upload de arquivos usando Multer
Const storage = multer.diskStorage({
    Destination: (req, file, cb) => {
        Cb(null, 'uploads/');
    },
    Filename: (req, file, cb) => {
        Cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

Const upload = multer({ storage: storage });

// Middleware para analisar corpos de solicitação
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());

// Rota para processar login
App.post('/login', (req, res) => {
    Const { username, senha } = req.body;

    Db.query('SELECT * FROM usuarios WHERE username = ?'), [username], (err, result) => {
        If(err) {
            Console.log(err);
            Res.status(500).json({ error: 'Erro interno no servidor' });
            Return;
        }

        If(result.length > 0) {
            Const usuario = result[0];
            Bcrypt.compare(senha, usuario.senha, (error, isMatch) => {
                If(error) {
                    Console.log(error);
                    Res.status(500).json({ error: 'Erro interno no servidor' });
                    Return;
                }
                If(isMatch) {
                    If(usuario.login_feito) {
                        Res.status(403).json({ error: 'Usuário já fez login anteriormente' });
                    } else {
                        // Marca o usuário como login feito
                        Db.query('UPDATE usuarios SET login_feito = 1 WHERE id = ?', [usuario.id], (updateErr, updateResult) => {
                            If(updateErr) {
                                Console.log(updateErr);
                                Res.status(500).json({ error: 'Erro interno no servidor' });
                                Return;
                            }
                            Res.status(200).json({ success: true });
                        });
                    }
                } else {
                    Res.status(401).json({ error: 'Credenciais inválida' });
                }
            });
        } else {
            Res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });
});

// Rota para processar inscrição
App.post('/inscricao', upload.fields([{ name: 'foto', maxCount: 1 }, { name: 'certificado', maxCount: 1 }, { name: 'bi', maxCount: 1 }]), (req, res) => {
    Const { curso, nome, nomePai, nomeMae, numero, email } = req.body;
    Const fotoPath = req.files['foto'][0].path;
    Const certificadoPath = req.files['certificado'][0].path;
    Const biPath = req.files['bi'][0].path;
    Const usuarioId = req.usuarioId; // Supondo que o ID do usuário tenha sido previamente obtido na autenticação

    // Verifica se o usuário já realizou a inscrição antes
    Db.query('SELECT * FROM inscricoes WHERE usuario_id = ?', [usuarioId], (selectErr, selectResult) => {
        If(selectErr) {
            Console.log(selectErr);
            Res.status(500).json({ error: 'Erro interno no servidor' });
            Return;
        }

        If(selectResult.length > 0) {
            Res.status(403).json({ error: 'Usuário já realizou a inscrição anteriormente' });
        } else {
            // Insere os dados da inscrição no banco de dados
            Const inscricao = {
                Usuario_id: usuarioId,
                Curso: curso,
                Nome: nome,
                Nome_pai: nomePai,
                Nome_mae: nomeMae,
                Numero: numero,
                Email: email,
                Foto_path: fotoPath,
                Certificado_path: certificadoPath,
                Bi_path: biPath,
                Inscricao_feita: 1 // Marca como inscrição feita
            };

            Db.query('INSERT INTO inscricoes SET ?', inscricao, (insertErr, insertResult) => {
                If(insertErr) {
                    Console.log(insertErr);
                    Res.status(500).json({ error: 'Erro interno no servidor' });
                    Return;
                }
                Res.status(200).json({ success: true });
            });
        }
    });
});

App.listen(port, () => {
    Console.log('Servidor rodando em http://localhost:${port}');
});