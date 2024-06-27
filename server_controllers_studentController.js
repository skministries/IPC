// studentController.js
const Student = require('../models/student');

exports.getStudentByBi = async (req, res) => {
  try {
    const student = await Student.findOne({ bi: req.params.bi });
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.json(student);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addNote = async (req, res) => {
  try {
    const student = await Student.findOne({ bi: req.params.bi });
    if (!student) {
      return res.status(404).send('Student not found');
    }
    student.notas.push(req.body);
    await student.save();
    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};
