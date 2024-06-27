const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const authRoutes = require('./routes/authRoutes');
const authController = require('./controllers/authController');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/students', authController.verifyToken, studentRoutes);
app.use('/api/teachers', authController.verifyToken, teacherRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
