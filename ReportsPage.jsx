import { useMemo, useState } from 'react'
import { PiggyBank, TrendingDown, TrendingUp, Receipt } from 'lucide-react'
import { useTransactions } from '../hooks/useTransactions'
import { formatINR, formatMonthLabel, getCurrentMonthKey, getMonthKey, getRecentMonthKeys } from '../lib/format'
import {
  calculateTotals,
  getTopExpenses,
  groupExpensesByCategory,
  groupTotalsByMonth,
} from '../lib/summary'
import { amountClass, cardClass } from '../lib/styles'
import PageHeader from '../components/common/PageHeader'
import Panel from '../components/common/Panel'
import MonthSelector from '../components/common/MonthSelector'
import EmptyState from '../components/common/EmptyState'
import ErrorMessage from '../components/common/ErrorMessage'
import Spinner from '../components/common/Spinner'
import StatCard from '../components/common/StatCard'
import CategoryPieChart from '../components/charts/CategoryPieChart'
import MonthlyTrendChart from '../components/charts/MonthlyTrendChart'
import CategoryBreakdown from '../components/reports/CategoryBreakdown'
import HighestExpenses from '../components/reports/HighestExpenses'

const TREND_MONTHS = 12
const TOP_EXPENSE_COUNT = 5

export default function ReportsPage() {
  const { transactions, loading, error, reload } = useTransactions()
  const [monthKey, setMonthKey] = useState(getCurrentMonthKey)

  const monthTransactions = useMemo(
    () => transactions.filter((transaction) => getMonthKey(transaction.transaction_date) === monthKey),
    [transactions, monthKey],
  )
  const totals = useMemo(() => calculateTotals(monthTransactions), [monthTransactions])
  const trend = useMemo(
    () => groupTotalsByMonth(transactions, getRecentMonthKeys(TREND_MONTHS, monthKey)),
    [transactions, monthKey],
  )
  const categoryData = useMemo(() => groupExpensesByCategory(monthTransactions), [monthTransactions])
  const topExpenses = useMemo(
    () => getTopExpenses(monthTransactions, TOP_EXPENSE_COUNT),
    [monthTransactions],
  )
  const monthLabel = formatMonthLabel(monthKey)

  function renderBody() {
    if (loading) return <Spinner label="Loading reports..." />
    if (transactions.length === 0) {
      return (
        <div className={cardClass}>
          <EmptyState
            icon={Receipt}
            title="Nothing to report yet"
            description="Once you add transactions, your monthly totals, trends, and category breakdowns will appear here."
          />
        </div>
      )
    }

    return (
      <>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total income"
            value={formatINR(totals.income)}
            helper={monthLabel}
            icon={TrendingUp}
            tone="emerald"
            valueClassName="text-emerald-600"
          />
          <StatCard
            label="Total expenses"
            value={formatINR(totals.expense)}
            helper={monthLabel}
            icon={TrendingDown}
            tone="rose"
            valueClassName="text-rose-600"
          />
          <StatCard
            label="Net savings"
            value={formatINR(totals.balance)}
            helper="Income minus expenses"
            icon={PiggyBank}
            tone="sky"
            valueClassName={amountClass(totals.balance)}
          />
        </div>

        <Panel title="Monthly spending trends" subtitle={`Last ${TREND_MONTHS} months up to ${monthLabel}`}>
          <MonthlyTrendChart data={trend} />
        </Panel>

        <div className="grid gap-6 xl:grid-cols-2">
          <Panel title="Spending by category" subtitle={monthLabel}>
            <div className="grid gap-6 lg:grid-cols-2">
              <CategoryPieChart data={categoryData} />
              <CategoryBreakdown data={categoryData} />
            </div>
          </Panel>

          <Panel title="Highest expenses" subtitle={`Top ${TOP_EXPENSE_COUNT} expenses in ${monthLabel}`}>
            <HighestExpenses transactions={topExpenses} />
          </Panel>
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reports"
        subtitle="Review your income, spending, and savings for any month."
        actions={<MonthSelector id="reports-month" value={monthKey} onChange={setMonthKey} />}
      />

      {error && <ErrorMessage message={error} onRetry={reload} />}

      {renderBody()}
    </div>
  )
}
