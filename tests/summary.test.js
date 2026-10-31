import { describe, expect, it } from 'vitest'
import { calculateTotals, filterTransactionsByMonth } from '../src/lib/summary'

const transactions = [
  { type: 'income', amount: 50000, transaction_date: '2026-10-01' },
  { type: 'expense', amount: 12000.5, transaction_date: '2026-10-05' },
  { type: 'expense', amount: 3000, transaction_date: '2026-09-20' },
  { type: 'income', amount: 20000, transaction_date: '2026-09-02' },
]

describe('calculateTotals', () => {
  it('returns zeros for no transactions', () => {
    expect(calculateTotals([])).toEqual({ income: 0, expense: 0, balance: 0 })
  })

  it('counts income only when there are no expenses', () => {
    const incomeOnly = [{ type: 'income', amount: 45000, transaction_date: '2026-10-01' }]
    expect(calculateTotals(incomeOnly)).toEqual({ income: 45000, expense: 0, balance: 45000 })
  })

  it('counts expenses only and returns a negative balance', () => {
    const expenseOnly = [{ type: 'expense', amount: 800.25, transaction_date: '2026-10-03' }]
    expect(calculateTotals(expenseOnly)).toEqual({ income: 0, expense: 800.25, balance: -800.25 })
  })

  it('totals all transactions across months', () => {
    expect(calculateTotals(transactions)).toEqual({ income: 70000, expense: 15000.5, balance: 54999.5 })
  })

  it('handles amounts stored as strings', () => {
    const stringAmounts = [{ type: 'income', amount: '100.10', transaction_date: '2026-10-01' }]
    expect(calculateTotals(stringAmounts).income).toBe(100.1)
  })
})

describe('monthly savings', () => {
  it('uses only the selected month for income minus expenses', () => {
    const october = calculateTotals(filterTransactionsByMonth(transactions, '2026-10'))
    expect(october).toEqual({ income: 50000, expense: 12000.5, balance: 37999.5 })
  })

  it('reports a different result for a different month', () => {
    const september = calculateTotals(filterTransactionsByMonth(transactions, '2026-09'))
    expect(september.balance).toBe(17000)
  })

  it('returns zero savings for a month with no transactions', () => {
    const november = calculateTotals(filterTransactionsByMonth(transactions, '2026-11'))
    expect(november).toEqual({ income: 0, expense: 0, balance: 0 })
  })

  it('returns an empty list when there are no transactions', () => {
    expect(filterTransactionsByMonth([], '2026-10')).toEqual([])
  })
})
