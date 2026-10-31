import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCompactINR, formatINR } from '../../lib/format'

export default function IncomeExpenseChart({ data }) {
  const hasData = data.some((month) => month.income > 0 || month.expense > 0)
  if (!hasData) {
    return <p className="py-16 text-center text-sm text-slate-500">No income or expenses recorded in this period.</p>
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis
            tickFormatter={formatCompactINR}
            tickLine={false}
            axisLine={false}
            width={72}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip formatter={(value) => formatINR(value)} cursor={{ fill: '#f1f5f9' }} />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
          <Bar dataKey="expense" name="Expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
