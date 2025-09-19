const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const categoriesRouter = require('./routes/categories');
const expensesRouter = require('./routes/expenses');
const reportsRouter = require('./routes/reports');

app.use('/categories', categoriesRouter);
app.use('/expenses', expensesRouter);
app.use('/reports', reportsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Expense Tracker API running.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Expense Tracker API listening on port ${PORT}`);
});
