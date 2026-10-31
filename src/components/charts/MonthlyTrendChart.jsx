import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCompactINR, formatINR } from '../../lib/format'

export default function MonthlyTrendChart({ data }) {
  const hasData = data.some((month) => month.income > 0 || month.expense > 0)
  if (!hasData) {
    return <p className="py-16 text-center text-sm text-slate-500">No income or expenses recorded in these months.</p>
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis
            tickFormatter={formatCompactINR}
            tickLine={false}
            axisLine={false}
            width={72}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip formatter={(value) => formatINR(value)} />
          <Legend />
          <Line
            type="monotone"
            dataKey="expense"
            name="Expenses"
            stroke="#f43f5e"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
