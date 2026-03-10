const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');
const { authenticateToken } = require('../middleware/auth');
const { predictDisease, allSymptoms } = require('../ai/predictor');

const router = express.Router();

router.get('/list', (req, res) => {
  res.json({ symptoms: allSymptoms });
});

router.post('/analyze', async (req, res) => {
  try {
    const { symptoms, user_id } = req.body;
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: 'Please select at least one symptom.' });
    }
    const result = predictDisease(symptoms);
    if (user_id) {
      const recordId = uuidv4();
      const record = {
        record_id: recordId, id: recordId, user_id, symptoms,
        predictions: result.predictions,
        predicted_disease: result.predictions[0]?.disease || 'Unknown',
        confidence: result.predictions[0]?.confidence || 0,
        date: new Date().toISOString()
      };
      await db.add('symptoms_records', record);
      result.record_id = recordId;
    }
    res.json(result);
  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ error: 'Internal server error during analysis.' });
  }
});

router.get('/history', authenticateToken, async (req, res) => {
  try {
    const records = await db.query('symptoms_records', 'user_id', req.user.user_id);
    records.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json({ records });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
