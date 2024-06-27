<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - IPC</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            background-color: #f0f0f0;
            color: #333;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Bem-vindo, <?php echo $_SESSION['username']; ?></h2>
        <p>Esta é a área de acesso do Instituto Politécnico de Camacupa.</p>
        <?php if ($_SESSION['role'] == 'student'): ?>
            <h3>Notas</h3>
            <!-- Aqui você pode adicionar o código para mostrar as notas do estudante -->
        <?php endif; ?>
        <h3>Informações</h3>
        <!-- Aqui você pode adicionar informações importantes da escola -->
    </div>
</body>
</html>

