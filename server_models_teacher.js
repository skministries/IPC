// teacher.js
const mongoose = require('../services/database');

const teacherSchema = new mongoose.Schema({
  nome: String,
  disciplinas: [String]
});

module.exports = mongoose.model('Teacher', teacherSchema);
