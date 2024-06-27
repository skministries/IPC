// teacher.js
const mongoose = require('../services/database');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
  nome: String,
  email: String,
  password: String,
  disciplinas: [String]
});

// Método para criptografar a senha antes de salvar
teacherSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Método para verificar a senha
teacherSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Teacher', teacherSchema);
