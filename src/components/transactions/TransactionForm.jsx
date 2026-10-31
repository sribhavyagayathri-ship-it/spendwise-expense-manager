import { useState } from 'react'
import { getCategoryOptions } from '../../lib/categories'
import { fieldClass, primaryButtonClass, secondaryButtonClass } from '../../lib/styles'
import { MAX_DESCRIPTION_LENGTH, MAX_NOTES_LENGTH, validateTransaction } from '../../lib/transactionForm'
import FormField from '../common/FormField'

const TYPE_OPTIONS = [
  { value: 'expense', label: 'Expense', activeClass: 'bg-rose-600' },
  { value: 'income', label: 'Income', activeClass: 'bg-emerald-600' },
]

function CharacterCount({ length, max }) {
  const over = length > max
  return (
    <p className={`text-right text-xs ${over ? 'text-rose-600' : 'text-slate-500'}`}>
      {length}/{max}
    </p>
  )
}

export default function TransactionForm({ initialValues, submitLabel, submitting, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const categories = getCategoryOptions(values.type)

  function updateField(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function changeType(type) {
    setValues((prev) => ({
      ...prev,
      type,
      category: getCategoryOptions(type).some((option) => option.name === prev.category) ? prev.category : '',
    }))
    setErrors((prev) => ({ ...prev, type: undefined, category: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validateTransaction(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return
    await onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div role="group" aria-label="Transaction type" className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
        {TYPE_OPTIONS.map((option) => {
          const active = values.type === option.value
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => changeType(option.value)}
              className={`rounded-lg py-2 text-sm font-medium transition ${
                active ? `${option.activeClass} text-white shadow-sm` : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <FormField id="tx-description" label="Description" error={errors.description}>
        <input
          id="tx-description"
          type="text"
          value={values.description}
          onChange={(event) => updateField('description', event.target.value)}
          aria-invalid={Boolean(errors.description)}
          placeholder="e.g. Monthly bus pass"
          className={`${fieldClass} w-full`}
        />
        <CharacterCount length={values.description.length} max={MAX_DESCRIPTION_LENGTH} />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="tx-amount" label="Amount (INR)" error={errors.amount}>
          <input
            id="tx-amount"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={values.amount}
            onChange={(event) => updateField('amount', event.target.value)}
            aria-invalid={Boolean(errors.amount)}
            placeholder="0.00"
            className={`${fieldClass} w-full`}
          />
        </FormField>
        <FormField id="tx-date" label="Date" error={errors.date}>
          <input
            id="tx-date"
            type="date"
            value={values.date}
            onChange={(event) => updateField('date', event.target.value)}
            aria-invalid={Boolean(errors.date)}
            className={`${fieldClass} w-full`}
          />
        </FormField>
      </div>

      <FormField id="tx-category" label="Category" error={errors.category}>
        <select
          id="tx-category"
          value={values.category}
          onChange={(event) => updateField('category', event.target.value)}
          aria-invalid={Boolean(errors.category)}
          className={`${fieldClass} w-full`}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="tx-notes" label="Notes (optional)" error={errors.notes}>
        <textarea
          id="tx-notes"
          rows={3}
          value={values.notes}
          onChange={(event) => updateField('notes', event.target.value)}
          aria-invalid={Boolean(errors.notes)}
          placeholder="Any extra details"
          className={`${fieldClass} w-full resize-none`}
        />
        <CharacterCount length={values.notes.length} max={MAX_NOTES_LENGTH} />
      </FormField>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} disabled={submitting} className={secondaryButtonClass}>
          Cancel
        </button>
        <button type="submit" disabled={submitting} className={primaryButtonClass}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
