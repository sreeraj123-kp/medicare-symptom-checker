const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    const existing = await db.query('users', 'email', email);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const user = {
      user_id: userId, id: userId, name, email,
      password: hashedPassword, age: age || null, gender: gender || null,
      role: 'user', created_at: new Date().toISOString()
    };
    await db.add('users', user);
    const token = jwt.sign(
      { user_id: userId, email, name, role: 'user' },
      process.env.JWT_SECRET, { expiresIn: '24h' }
    );
    res.status(201).json({
      message: 'Account created successfully!', token,
      user: { user_id: userId, name, email, age, gender, role: 'user' }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const users = await db.query('users', 'email', email);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, name: user.name, role: user.role || 'user' },
      process.env.JWT_SECRET, { expiresIn: '24h' }
    );
    res.json({
      message: 'Login successful!', token,
      user: { user_id: user.user_id, name: user.name, email: user.email, age: user.age, gender: user.gender, role: user.role || 'user' }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const users = await db.query('users', 'email', req.user.email);
    if (users.length === 0) return res.status(404).json({ error: 'User not found.' });
    const user = users[0];
    res.json({ user_id: user.user_id, name: user.name, email: user.email, age: user.age, gender: user.gender, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
