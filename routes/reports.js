const express = require('express');
const router = express.Router();
const db = require('../db');

// Simple report: total expense per category over a given time period
router.get('/total-by-category', async (req, res) => {
  // ?start=yyyy-mm-dd&end=yyyy-mm-dd
  const { start, end } = req.query;
  const where = [];
  const params = [];
  let n = 1;
  if (start) {
    where.push(`e.expense_date >= $${n++}`);
    params.push(start);
  }
  if (end) {
    where.push(`e.expense_date <= $${n++}`);
    params.push(end);
  }
  const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  try {
    const result = await db.query(
      `SELECT c.name AS category, SUM(e.amount)::numeric(12,2) AS total
       FROM expenses e
       LEFT JOIN expense_categories c ON e.category_id = c.id
       ${whereClause}
       GROUP BY c.name
       ORDER BY category` ,
       params
    );
    res.json(result.rows);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
