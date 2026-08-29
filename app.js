const express = require('express');
const path = require('path');
require('dotenv').config();
const studentRoutes = require('./routes/students');

const app = express();

// Set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/students', studentRoutes);

// Home route - redirect to students list
app.get('/', (req, res) => {
  res.redirect('/students');
});

// 404 error handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
