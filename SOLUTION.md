# Solution Steps

1. Design the PostgreSQL schema: create a table for expense_categories (with unique name) and a table for expenses (with category_id as a foreign key, positive numeric amount, description, date, and timestamp).

2. Add a CHECK constraint to ensure expense amounts are positive; set expense_categories.name as UNIQUE.

3. Add an index to expenses on (category_id, expense_date) to support efficient reporting queries.

4. Implement the schema in SQL in db/schema.sql.

5. Create a db/index.js that provides a pooled pg client interface for async/await database queries.

6. Implement routes/categories.js to allow listing and creating categories using the database.

7. Implement routes/expenses.js for adding expenses (validating required fields, positive amount), listing, and deleting expenses, all using parameterized SQL queries.

8. Implement routes/reports.js to provide total expense per category over a date range with a performant GROUP BY SQL query using the index.

9. Update/app.js to use the new routers, body parser, and expose endpoints.

10. Make sure all database operations are async/await and use proper error handling.

