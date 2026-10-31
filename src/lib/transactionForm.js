import { getTodayIso } from './format'

const MAX_AMOUNT = 999999999999.99
export const MAX_DESCRIPTION_LENGTH = 100
export const MAX_NOTES_LENGTH = 500

export function createFormValues(transaction) {
  if (!transaction) {
    return { description: '', amount: '', type: 'expense', category: '', date: getTodayIso(), notes: '' }
  }
  return {
    description: transaction.description,
    amount: String(transaction.amount),
    type: transaction.type,
    category: transaction.category,
    date: transaction.transaction_date,
    notes: transaction.notes ?? '',
  }
}

export function validateTransaction(values) {
  const errors = {}
  const amount = Number(values.amount)

  if (!values.description.trim()) errors.description = 'Description is required.'
  else if (values.description.length > MAX_DESCRIPTION_LENGTH)
    errors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`
  if (values.amount === '' || Number.isNaN(amount)) errors.amount = 'Enter a valid amount.'
  else if (amount <= 0) errors.amount = 'Amount must be greater than zero.'
  else if (amount > MAX_AMOUNT) errors.amount = 'Amount is too large.'
  if (!values.type) errors.type = 'Select a transaction type.'
  if (!values.category) errors.category = 'Select a category.'
  if (!values.date) errors.date = 'Date is required.'
  if (values.notes.length > MAX_NOTES_LENGTH) errors.notes = `Notes must be ${MAX_NOTES_LENGTH} characters or fewer.`

  return errors
}
