const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, name FROM expense_categories ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a category
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Category name required' });
  }
  try {
    const result = await db.query(
      'INSERT INTO expense_categories (name) VALUES ($1) RETURNING id, name',
      [name.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'Category already exists' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = router;
