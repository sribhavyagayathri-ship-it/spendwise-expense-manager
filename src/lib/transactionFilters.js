import { getMonthKey } from './format'

export const DEFAULT_FILTERS = {
  search: '',
  type: '',
  category: '',
  month: '',
  dateFrom: '',
  dateTo: '',
  sort: 'date-desc',
}

export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
  { value: 'amount-desc', label: 'Highest amount' },
  { value: 'amount-asc', label: 'Lowest amount' },
]

function compareByDate(a, b) {
  return a.transaction_date.localeCompare(b.transaction_date) || a.created_at.localeCompare(b.created_at)
}

function compareByAmount(a, b) {
  return Number(a.amount) - Number(b.amount)
}

const COMPARATORS = {
  'date-desc': (a, b) => compareByDate(b, a),
  'date-asc': compareByDate,
  'amount-desc': (a, b) => compareByAmount(b, a),
  'amount-asc': compareByAmount,
}

export function applyTransactionFilters(transactions, filters) {
  const query = filters.search.trim().toLowerCase()

  return transactions
    .filter(
      (transaction) =>
        (!query || transaction.description.toLowerCase().includes(query)) &&
        (!filters.type || transaction.type === filters.type) &&
        (!filters.category || transaction.category === filters.category) &&
        (!filters.month || getMonthKey(transaction.transaction_date) === filters.month) &&
        (!filters.dateFrom || transaction.transaction_date >= filters.dateFrom) &&
        (!filters.dateTo || transaction.transaction_date <= filters.dateTo),
    )
    .sort(COMPARATORS[filters.sort])
}
