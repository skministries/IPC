<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password_confirm = $_POST['password_confirm'];

    if ($password !== $password_confirm) {
        echo 'As senhas não coincidem';
        exit();
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $query = $conn->prepare('INSERT INTO users (nome, email, password) VALUES (?, ?, ?)');
    $query->bind_param('sss', $nome, $email, $hashed_password);
    
    if ($query->execute()) {
        header('Location: login.html');
        exit();
    } else {
        echo 'Erro ao registrar';
    }
}
?>
