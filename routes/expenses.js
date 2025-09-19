const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT e.id, e.amount, e.description, e.expense_date,
              e.category_id, c.name as category, e.created_at
         FROM expenses e
         LEFT JOIN expense_categories c ON e.category_id = c.id
         ORDER BY e.expense_date DESC, e.id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new expense
router.post('/', async (req, res) => {
  const { amount, category_id, description, expense_date } = req.body;
  if (amount === undefined || !category_id || !expense_date) {
    return res.status(400).json({ error: 'amount, category_id, and expense_date are required' });
  }

  if (isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }

  try {
    const result = await db.query(
      `INSERT INTO expenses (amount, category_id, description, expense_date)
       VALUES ($1, $2, $3, $4)
       RETURNING id, amount, category_id, description, expense_date, created_at`,
      [amount, category_id, description || null, expense_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// (Optional) Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await db.query('DELETE FROM expenses WHERE id=$1 RETURNING id', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
