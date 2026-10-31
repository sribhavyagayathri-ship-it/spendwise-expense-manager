import { formatINR } from '../../lib/format'

export default function CategoryBreakdown({ data }) {
  const total = data.reduce((sum, category) => sum + category.value, 0)

  if (data.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-500">No expenses recorded in this period.</p>
  }

  return (
    <ul className="flex flex-col gap-4">
      {data.map((category) => {
        const share = total > 0 ? (category.value / total) * 100 : 0
        return (
          <li key={category.name}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 font-medium text-slate-700">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: category.color }} />
                {category.name}
              </span>
              <span className="whitespace-nowrap text-slate-600">
                {formatINR(category.value)} <span className="text-slate-400">({share.toFixed(1)}%)</span>
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${share}%`, backgroundColor: category.color }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
