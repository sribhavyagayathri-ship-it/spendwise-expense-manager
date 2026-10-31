import { Search } from 'lucide-react'
import { ALL_CATEGORY_NAMES } from '../../lib/categories'
import { fieldClass } from '../../lib/styles'
import { SORT_OPTIONS } from '../../lib/transactionFilters'
import MonthSelector from '../common/MonthSelector'

export default function TransactionFilters({ filters, onChange }) {
  function update(name, value) {
    onChange({ ...filters, [name]: value })
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className="relative sm:col-span-2 xl:col-span-2">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={filters.search}
          onChange={(event) => update('search', event.target.value)}
          placeholder="Search by description"
          aria-label="Search by description"
          className={`${fieldClass} w-full pl-9`}
        />
      </div>

      <select
        value={filters.type}
        onChange={(event) => update('type', event.target.value)}
        aria-label="Filter by type"
        className={`${fieldClass} w-full`}
      >
        <option value="">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filters.category}
        onChange={(event) => update('category', event.target.value)}
        aria-label="Filter by category"
        className={`${fieldClass} w-full`}
      >
        <option value="">All categories</option>
        {ALL_CATEGORY_NAMES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={filters.dateFrom}
        onChange={(event) => update('dateFrom', event.target.value)}
        aria-label="From date"
        title="From date"
        className={`${fieldClass} w-full`}
      />

      <input
        type="date"
        value={filters.dateTo}
        onChange={(event) => update('dateTo', event.target.value)}
        aria-label="To date"
        title="To date"
        className={`${fieldClass} w-full`}
      />

      <MonthSelector id="filter-month" value={filters.month} onChange={(value) => update('month', value)} includeAll />

      <select
        value={filters.sort}
        onChange={(event) => update('sort', event.target.value)}
        aria-label="Sort transactions"
        className={`${fieldClass} w-full`}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
