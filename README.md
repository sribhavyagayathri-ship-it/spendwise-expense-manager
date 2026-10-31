# SpendWise - Personal Expense Management

SpendWise is a web app for tracking personal income and expenses. Users sign up, record transactions, and see totals, monthly trends, and category breakdowns on a dashboard and reports page.

## Problem Statement

Keeping track of day-to-day spending is hard when transactions live in scattered notes or bank apps. SpendWise gives one private place to record income and expenses, categorize them, and see where money goes each month.

## Features

- Account sign-up, sign-in, and sign-out with email and password
- Forgot-password flow: request a reset email and set a new password on the reset page
- Show/hide toggle on password fields
- Dashboard with income, expenses, balance, and monthly savings for a selected month
- Transactions list with search, type, category, month, and date-range filters
- Add, edit, and delete transactions (description, amount, income or expense, category, date, optional notes)
- Input limits: descriptions up to 100 characters, notes up to 500 characters, amounts must be positive
- Categories page with per-category totals
- Reports page with monthly trend, income vs. expense, and category charts, plus highest expenses
- Empty states when there is no data yet
- Each user only sees their own transactions (enforced by the database)

## Technology Stack

- **Frontend:** React 18, Vite 5, React Router 6
- **Styling:** Tailwind CSS 3, lucide-react icons
- **Charts:** Recharts
- **Backend and database:** Supabase (Postgres, Supabase Auth, Row Level Security)
- **Client library:** @supabase/supabase-js
- **Testing:** Vitest, Testing Library, jsdom
- **Linting:** ESLint

## Installation

Requirements: Node.js 18 or newer and npm.

```bash
git clone <your-repository-url>
cd spendwise-expense-manager
npm install
```

## Environment Variables

The app reads two values from a file named `.env` in the project root. Create that file yourself; it is listed in `.gitignore` and must never be committed.

```bash
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```

Use the project URL and the anon (public) key from your Supabase project's API settings. Never put the service-role key in this project or in any `VITE_` variable, because `VITE_` values are included in the browser code.

## Running the Development Server

```bash
npm run dev
```

Then open the local address that Vite prints in the terminal.

## Running Tests

```bash
npm test
```

The tests cover the dashboard calculations (income, expenses, balance, monthly savings), transaction form validation, password field behavior, and authentication error messages.

## Linting

```bash
npm run lint
```

## Building for Production

```bash
npm run build
```

The output is written to `dist/`. To preview the production build locally, run `npm run preview` after building.

## Database and Authentication Setup

The database schema lives in `supabase/migrations/`:

1. `20261030083757_create_transactions_table.sql` creates the `transactions` table, enables Row Level Security, and adds four policies so users can only read and change rows where `user_id` matches their own account.
2. `20261030085726_revoke_anon_access_to_transactions.sql` removes anonymous access to the table.

Apply the migrations to your Supabase project (for example through the Supabase dashboard SQL editor, or with the Supabase CLI against your project).

Authentication uses Supabase email and password sign-in. In your Supabase project:

- **Authentication > URL Configuration:** set the Site URL to your app's address, and add `<your-app-address>/reset-password` to the redirect allow list. Password reset emails link to this page.
- **Authentication > Providers > Email:** if "Confirm email" is enabled, new users must confirm their address before signing in.
- **Authentication > Providers > Email:** the minimum password length should match the app's rule of 6 characters.

## Deployment

1. Build the app with `npm run build`.
2. Deploy the `dist/` folder to any static host (for example Netlify, Vercel, or Cloudflare Pages), or use the host's Vite build setting.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in the host's settings.
4. Add the deployed address to Supabase's Site URL and to the redirect allow list, including `/reset-password`.

## Future Enhancements

- Split the production bundle into smaller chunks to reduce load time
- Use the shared month filter on the Reports page as well as the dashboard
- Export transactions to CSV
- Recurring transactions and budgets
