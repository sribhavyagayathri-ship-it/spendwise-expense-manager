import { describe, expect, it } from 'vitest'
import { MAX_DESCRIPTION_LENGTH, MAX_NOTES_LENGTH, validateTransaction } from '../src/lib/transactionForm'

const validValues = {
  description: 'Bus pass',
  amount: '250',
  type: 'expense',
  category: 'Transport',
  date: '2026-10-05',
  notes: '',
}

describe('validateTransaction', () => {
  it('accepts a complete valid transaction', () => {
    expect(validateTransaction(validValues)).toEqual({})
  })

  it('requires a description', () => {
    expect(validateTransaction({ ...validValues, description: '' }).description).toBeDefined()
    expect(validateTransaction({ ...validValues, description: '   ' }).description).toBeDefined()
  })

  it('accepts a description at the length limit and rejects one over it', () => {
    const atLimit = 'a'.repeat(MAX_DESCRIPTION_LENGTH)
    const overLimit = 'a'.repeat(MAX_DESCRIPTION_LENGTH + 1)
    expect(validateTransaction({ ...validValues, description: atLimit })).toEqual({})
    expect(validateTransaction({ ...validValues, description: overLimit }).description).toMatch(/100 characters/)
  })

  it('rejects empty, zero, and negative amounts', () => {
    expect(validateTransaction({ ...validValues, amount: '' }).amount).toBe('Enter a valid amount.')
    expect(validateTransaction({ ...validValues, amount: 'abc' }).amount).toBe('Enter a valid amount.')
    expect(validateTransaction({ ...validValues, amount: '0' }).amount).toBe('Amount must be greater than zero.')
    expect(validateTransaction({ ...validValues, amount: '-5' }).amount).toBe('Amount must be greater than zero.')
  })

  it('rejects amounts that are too large', () => {
    expect(validateTransaction({ ...validValues, amount: '1000000000000' }).amount).toBe('Amount is too large.')
  })

  it('requires a category, type, and date', () => {
    expect(validateTransaction({ ...validValues, category: '' }).category).toBeDefined()
    expect(validateTransaction({ ...validValues, type: '' }).type).toBeDefined()
    expect(validateTransaction({ ...validValues, date: '' }).date).toBeDefined()
  })

  it('accepts notes at the length limit and rejects notes over it', () => {
    expect(validateTransaction({ ...validValues, notes: 'n'.repeat(MAX_NOTES_LENGTH) })).toEqual({})
    expect(validateTransaction({ ...validValues, notes: 'n'.repeat(MAX_NOTES_LENGTH + 1) }).notes).toMatch(/500 characters/)
  })
})
