import { Pencil, Trash2 } from 'lucide-react'
import { getCategoryMeta } from '../../lib/categories'
import { formatDate, formatINR } from '../../lib/format'

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  const showActions = Boolean(onEdit && onDelete)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th scope="col" className="px-4 py-3">Description</th>
            <th scope="col" className="px-4 py-3">Category</th>
            <th scope="col" className="px-4 py-3">Date</th>
            <th scope="col" className="px-4 py-3 text-right">Amount</th>
            {showActions && (
              <th scope="col" className="px-4 py-3 text-right">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === 'income'
            const { icon: CategoryIcon } = getCategoryMeta(transaction.type, transaction.category)

            return (
              <tr key={transaction.id} className="transition hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{transaction.description}</p>
                  {transaction.notes && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{transaction.notes}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap text-slate-700">
                    <CategoryIcon className="h-4 w-4 text-slate-400" />
                    {transaction.category}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">{formatDate(transaction.transaction_date)}</td>
                <td
                  className={`whitespace-nowrap px-4 py-3 text-right font-semibold ${
                    isIncome ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {isIncome ? '+' : '-'}
                  {formatINR(transaction.amount)}
                </td>
                {showActions && (
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(transaction)}
                        aria-label={`Edit ${transaction.description}`}
                        title="Edit"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(transaction)}
                        aria-label={`Delete ${transaction.description}`}
                        title="Delete"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
