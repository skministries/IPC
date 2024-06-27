document.getElementById('inscricaoForm').addEventListener('submit', function(event) {
  var form = event.target;
  var valid = true;

  // Verificação de campo de texto vazio
  var inputs = form.querySelectorAll('input[type="text"], input[type="email"]');
  inputs.forEach(function(input) {
    if (!input.value.trim()) {
      valid = false;
      input.style.borderColor = 'red';
    } else {
      input.style.borderColor = '';
    }
  });

  // Verificação de arquivo selecionado
  var files = form.querySelectorAll('input[type="file"]');
  files.forEach(function(file) {
    if (!file.files.length) {
      valid = false;
      file.style.borderColor = 'red';
    } else {
      file.style.borderColor = '';
    }
  });

  if (!valid) {
    event.preventDefault();
    alert('Por favor, preencha todos os campos obrigatórios e selecione os arquivos necessários.');
  }
});
