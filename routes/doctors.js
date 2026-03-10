const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { specialization } = req.query;
    let doctors;
    if (specialization) {
      doctors = await db.query('doctors', 'specialization', specialization);
    } else {
      doctors = await db.getAll('doctors');
    }
    res.json({ doctors });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, specialization, hospital, location, contact } = req.body;
    if (!name || !specialization) {
      return res.status(400).json({ error: 'Name and specialization are required.' });
    }
    const doctorId = uuidv4();
    const doctor = { doctor_id: doctorId, id: doctorId, name, specialization, hospital: hospital || '', location: location || '', contact: contact || '' };
    await db.add('doctors', doctor);
    res.status(201).json({ message: 'Doctor added successfully.', doctor });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const updated = await db.update('doctors', req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Doctor not found.' });
    res.json({ message: 'Doctor updated successfully.', doctor: updated });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await db.delete('doctors', req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Doctor not found.' });
    res.json({ message: 'Doctor deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
