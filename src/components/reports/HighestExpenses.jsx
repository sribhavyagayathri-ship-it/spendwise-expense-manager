import { formatDate, formatINR } from '../../lib/format'
import { getCategoryMeta } from '../../lib/categories'

export default function HighestExpenses({ transactions }) {
  if (transactions.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-500">No expenses recorded in this period.</p>
  }

  return (
    <ol className="divide-y divide-slate-100">
      {transactions.map((transaction, index) => {
        const { icon: CategoryIcon } = getCategoryMeta('expense', transaction.category)
        return (
          <li key={transaction.id} className="flex items-center gap-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
              {index + 1}
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <CategoryIcon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">{transaction.description}</p>
              <p className="text-xs text-slate-500">
                {transaction.category} | {formatDate(transaction.transaction_date)}
              </p>
            </div>
            <p className="whitespace-nowrap text-sm font-semibold text-rose-600">
              -{formatINR(transaction.amount)}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
