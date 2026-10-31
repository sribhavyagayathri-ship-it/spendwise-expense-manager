/*
# Revoke anonymous access to transactions

1. Modified Tables
- `transactions`: removed table-level privileges previously granted to the `anon` role (the not-signed-in visitor).

2. Security
- The app requires sign-in, and no policy grants `anon` access, so this only removes unused permissions.
- Signed-in users keep their existing access, limited by row-level security so they only see their own transactions.

3. Notes
- No data is changed or deleted.
*/

REVOKE ALL ON public.transactions FROM anon;
