const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// GET - Display all students
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [students] = await connection.query('SELECT * FROM students ORDER BY id DESC');
    connection.release();
    res.render('index', { students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// GET - Display add student form
router.get('/add', (req, res) => {
  res.render('form', { student: null, isEdit: false });
});

// GET - Display student details
router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [students] = await connection.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    connection.release();
    
    if (students.length === 0) {
      return res.status(404).render('error', { error: 'Student not found' });
    }
    
    res.render('detail', { student: students[0] });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// GET - Display edit student form
router.get('/:id/edit', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [students] = await connection.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    connection.release();
    
    if (students.length === 0) {
      return res.status(404).render('error', { error: 'Student not found' });
    }
    
    res.render('form', { student: students[0], isEdit: true });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// POST - Create new student
router.post('/', async (req, res) => {
  const { name, age, course, email } = req.body;
  
  // Validate input
  if (!name || !age || !course || !email) {
    return res.status(400).render('form', {
      student: req.body,
      isEdit: false,
      error: 'All fields are required'
    });
  }
  
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO students (name, age, course, email) VALUES (?, ?, ?, ?)',
      [name, age, course, email]
    );
    connection.release();
    res.redirect('/students');
  } catch (error) {
    console.error('Error creating student:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).render('form', {
        student: req.body,
        isEdit: false,
        error: 'Email already exists'
      });
    }
    res.status(500).render('error', { error: error.message });
  }
});

// POST - Update existing student
router.post('/:id', async (req, res) => {
  const { name, age, course, email } = req.body;
  const id = req.params.id;
  
  // Validate input
  if (!name || !age || !course || !email) {
    return res.status(400).render('form', {
      student: { id, ...req.body },
      isEdit: true,
      error: 'All fields are required'
    });
  }
  
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE students SET name = ?, age = ?, course = ?, email = ? WHERE id = ?',
      [name, age, course, email, id]
    );
    connection.release();
    res.redirect(`/students/${id}`);
  } catch (error) {
    console.error('Error updating student:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).render('form', {
        student: { id, ...req.body },
        isEdit: true,
        error: 'Email already exists'
      });
    }
    res.status(500).render('error', { error: error.message });
  }
});

// DELETE - Delete student
router.get('/:id/delete', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM students WHERE id = ?', [req.params.id]);
    connection.release();
    res.redirect('/students');
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).render('error', { error: error.message });
  }
});

module.exports = router;
