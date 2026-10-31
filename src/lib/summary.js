import { getCategoryMeta, getCategoryOptions } from './categories'
import { formatMonthLabel, getMonthKey } from './format'

function roundToCents(value) {
  return Math.round(value * 100) / 100
}

function sumByType(transactions, type) {
  const total = transactions.reduce(
    (sum, transaction) => (transaction.type === type ? sum + Number(transaction.amount) : sum),
    0,
  )
  return roundToCents(total)
}

export function calculateTotals(transactions) {
  const income = sumByType(transactions, 'income')
  const expense = sumByType(transactions, 'expense')
  return { income, expense, balance: roundToCents(income - expense) }
}

export function filterTransactionsByMonth(transactions, monthKey) {
  return transactions.filter((transaction) => getMonthKey(transaction.transaction_date) === monthKey)
}

export function groupTotalsByMonth(transactions, monthKeys) {
  return monthKeys.map((monthKey) => {
    const monthTransactions = filterTransactionsByMonth(transactions, monthKey)
    const { income, expense } = calculateTotals(monthTransactions)
    return { monthKey, label: formatMonthLabel(monthKey), income, expense }
  })
}

export function groupExpensesByCategory(transactions) {
  const totals = new Map()
  transactions.forEach((transaction) => {
    if (transaction.type !== 'expense') return
    const current = totals.get(transaction.category) ?? 0
    totals.set(transaction.category, current + Number(transaction.amount))
  })

  return [...totals]
    .map(([name, value]) => ({
      name,
      value: roundToCents(value),
      color: getCategoryMeta('expense', name).color,
    }))
    .sort((a, b) => b.value - a.value)
}

export function getTopExpenses(transactions, limit) {
  return transactions
    .filter((transaction) => transaction.type === 'expense')
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .slice(0, limit)
}

export function summarizeCategories(transactions, type) {
  return getCategoryOptions(type).map((category) => {
    const matching = transactions.filter(
      (transaction) => transaction.type === type && transaction.category === category.name,
    )
    return {
      ...category,
      count: matching.length,
      total: sumByType(matching, type),
    }
  })
}
