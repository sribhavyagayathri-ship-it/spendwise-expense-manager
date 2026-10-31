import { formatINR } from '../../lib/format'
import { cardClass } from '../../lib/styles'

export default function CategoryCard({ summary, type }) {
  const { name, icon: Icon, color, count, total } = summary
  const isIncome = type === 'income'

  return (
    <div className={`${cardClass} flex items-start gap-4 p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md`}>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900">{name}</p>
        <p className="mt-0.5 text-sm text-slate-500">
          {count} {count === 1 ? 'transaction' : 'transactions'}
        </p>
        <p className={`mt-2 text-lg font-semibold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
          {formatINR(total)}
        </p>
      </div>
    </div>
  )
}
