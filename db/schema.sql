-- PostgreSQL schema for Expense Tracker

CREATE TABLE expense_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES expense_categories(id) ON DELETE SET NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    description TEXT,
    expense_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index to support reporting queries (e.g. aggregate expenses by category)
CREATE INDEX idx_expenses_category_date ON expenses(category_id, expense_date);