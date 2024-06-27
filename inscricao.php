<?php
session_start();
include 'db_connection.php';

// Verifica se o usuário está autenticado
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Consulta simples para listar os cursos disponíveis (exemplo)
$sql = "SELECT * FROM cusos";
$stmt = $pdo->query($sql);
$courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>


<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscrição - SKMinistries Academy</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <img src="fund.jpg" alt="SKMinistries Academy">
            </div>
            <nav>
                <ul>
                    <li><a href="courses.php">Cursos</a></li>
                    <!-- Adicione outros links conforme necessário -->
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <div class="container">
            <h2>Inscrição</h2>
            <form action="process_enrollment.php" method="POST" enctype="multipart/form-data">
                <label for="course">Escolha o curso:</label>
                <select id="course" name="course" required>
                    <

option value="" disabled selected>Selecione o curso</option>
                    <?php foreach ($courses as $course): ?>
                        <option value="<?php echo $course['id']; ?>"><?php echo $course['name']; ?></option>
                    <?php endforeach; ?>
                </select>
                <label for="documentos">Documentos (PDF):</label>
                <input type="file" id="documentos" name="documentos[]" multiple required accept="application/pdf">
                <label for="nome_completo">Nome Completo:</label>
                <input type="text" id="nome_completo" name="nome_completo" required>
                <!-- Adicionar outros campos conforme necessário -->
                <button type="submit">Enviar Inscrição</button>
            </form>
        </div>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2024 SKMinistries Academy. Todos os direitos reservados.</p>
        </div>
    </footer>
</body>
</html>
