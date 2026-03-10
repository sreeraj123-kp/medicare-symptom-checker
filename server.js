require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const symptomsRoutes = require('./routes/symptoms');
const doctorsRoutes = require('./routes/doctors');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root redirect — must come BEFORE express.static (which auto-serves index.html)
app.get('/', (req, res) => res.redirect('/login'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/symptoms', symptomsRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/admin', adminRoutes);

// Serve frontend pages — Login is the landing page

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/checker', (req, res) => res.sendFile(path.join(__dirname, 'public', 'checker.html')));
app.get('/result', (req, res) => res.sendFile(path.join(__dirname, 'public', 'result.html')));
app.get('/doctors', (req, res) => res.sendFile(path.join(__dirname, 'public', 'doctors.html')));
app.get('/history', (req, res) => res.sendFile(path.join(__dirname, 'public', 'history.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

// 404 handler
app.use((req, res) => {
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`\n🏥 AI Cloud Symptom Checker is running!`);
  console.log(`   → http://localhost:${PORT}\n`);
  console.log(`   Admin login: admin@symptomchecker.com / admin123\n`);
});
