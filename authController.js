// authController.js
const Teacher = require('../models/teacher');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send('Professor registrado com sucesso');
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });
    if (!teacher || !(await teacher.comparePassword(password))) {
      return res.status(401).send('Email ou senha inválidos');
    }
    const token = jwt.sign({ id: teacher._id }, 'secreta', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Token não fornecido');
  }
  jwt.verify(token, 'secreta', (err, decoded) => {
    if (err) {
      return res.status(500).send('Falha na autenticação do token');
    }
    req.teacherId = decoded.id;
    next();
  });
};
