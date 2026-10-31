import { PiggyBank, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { amountClass } from '../../lib/styles'
import { formatINR } from '../../lib/format'
import StatCard from '../common/StatCard'

export default function SummaryCards({ totals, monthTotals, monthLabel }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total income"
        value={formatINR(totals.income)}
        helper="All time"
        icon={TrendingUp}
        tone="emerald"
        valueClassName="text-emerald-600"
      />
      <StatCard
        label="Total expenses"
        value={formatINR(totals.expense)}
        helper="All time"
        icon={TrendingDown}
        tone="rose"
        valueClassName="text-rose-600"
      />
      <StatCard
        label="Current balance"
        value={formatINR(totals.balance)}
        helper="Total income minus total expenses"
        icon={Wallet}
        tone="blue"
        valueClassName={amountClass(totals.balance)}
      />
      <StatCard
        label="Monthly savings"
        value={formatINR(monthTotals.balance)}
        helper={`Income minus expenses in ${monthLabel}`}
        icon={PiggyBank}
        tone="sky"
        valueClassName={amountClass(monthTotals.balance)}
      />
    </div>
  )
}
