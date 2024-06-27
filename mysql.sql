-- Criação da tabela de usuários
CREATE TABLE usuarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
    login feito 
);

-- Criação da tabela de cursos
CREATE TABLE cursos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Objetivo TEXT,
    Duracao VARCHAR(50),
    Disciplinas TEXT,
    Saida_emprego TEXT
);
