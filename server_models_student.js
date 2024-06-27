// student.js
const mongoose = require('../services/database');

const studentSchema = new mongoose.Schema({
  nome: String,
  bi: String,
  curso: String,
  notas: [
    {
      disciplina: String,
      nota: Number
    }
  ]
});

module.exports = mongoose.model('Student', studentSchema);
