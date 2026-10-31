/*
# Create transactions table for SpendWise

1. New Tables
- `transactions`
  - `id` (uuid, primary key, auto-generated)
  - `description` (text, required)
  - `amount` (numeric, must be greater than zero)
  - `type` (text, either 'income' or 'expense')
  - `category` (text, required)
  - `transaction_date` (date, required)
  - `notes` (text, optional)
  - `created_at` (timestamp, defaults to now)
  - `user_id` (uuid, owner of the row, defaults to the signed-in user)

2. Security
- Row Level Security is enabled on `transactions`.
- Only the `authenticated` role is granted access (no anonymous access).
- Four separate policies (select, insert, update, delete) allow a user to touch only rows where `user_id` equals their own user ID.

3. Indexes
- Index on `user_id` and `transaction_date` to speed up dashboard and report queries.

4. Important Notes
- No existing data is modified or removed. This is a new table.
- Insert statements do not need to send `user_id`; the database fills it from the signed-in session.
*/

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL CHECK (char_length(trim(description)) > 0),
  amount numeric(14, 2) NOT NULL CHECK (amount > 0),
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  category text NOT NULL CHECK (char_length(trim(category)) > 0),
  transaction_date date NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS transactions_user_date_idx ON transactions (user_id, transaction_date DESC);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON transactions TO authenticated;

DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
CREATE POLICY "Users can view own transactions"
ON transactions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;
CREATE POLICY "Users can insert own transactions"
ON transactions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own transactions" ON transactions;
CREATE POLICY "Users can update own transactions"
ON transactions FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own transactions" ON transactions;
CREATE POLICY "Users can delete own transactions"
ON transactions FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
