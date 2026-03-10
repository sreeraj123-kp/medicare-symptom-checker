const express = require('express');
const db = require('../database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const usersCount = await db.count('users');
    const recordsCount = await db.count('symptoms_records');
    const doctorsCount = await db.count('doctors');
    const records = await db.getAll('symptoms_records');
    const diseaseCounts = {};
    records.forEach(r => {
      const d = r.predicted_disease || 'Unknown';
      diseaseCounts[d] = (diseaseCounts[d] || 0) + 1;
    });
    res.json({ stats: { totalUsers: usersCount, totalAnalyses: recordsCount, totalDoctors: doctorsCount, diseaseDistribution: diseaseCounts } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await db.getAll('users');
    const safeUsers = users.map(u => ({ user_id: u.user_id, name: u.name, email: u.email, age: u.age, gender: u.gender, role: u.role, created_at: u.created_at }));
    res.json({ users: safeUsers });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/records', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const records = await db.getAll('symptoms_records');
    records.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json({ records });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
