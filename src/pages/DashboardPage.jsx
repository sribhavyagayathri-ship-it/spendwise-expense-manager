import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Wallet } from 'lucide-react'
import { useTransactions } from '../hooks/useTransactions'
import { calculateTotals, filterTransactionsByMonth, groupExpensesByCategory, groupTotalsByMonth } from '../lib/summary'
import { formatMonthLabel, getCurrentMonthKey, getRecentMonthKeys } from '../lib/format'
import { primaryButtonClass, secondaryButtonClass, cardClass } from '../lib/styles'
import PageHeader from '../components/common/PageHeader'
import Panel from '../components/common/Panel'
import MonthSelector from '../components/common/MonthSelector'
import EmptyState from '../components/common/EmptyState'
import ErrorMessage from '../components/common/ErrorMessage'
import Spinner from '../components/common/Spinner'
import SummaryCards from '../components/dashboard/SummaryCards'
import IncomeExpenseChart from '../components/charts/IncomeExpenseChart'
import CategoryPieChart from '../components/charts/CategoryPieChart'
import TransactionTable from '../components/transactions/TransactionTable'
import TransactionEditorModal from '../components/transactions/TransactionEditorModal'

const TREND_MONTHS = 6

export default function DashboardPage() {
  const { transactions, loading, error, reload, addTransaction } = useTransactions()
  const [monthKey, setMonthKey] = useState(getCurrentMonthKey)
  const [formOpen, setFormOpen] = useState(false)

  const totals = useMemo(() => calculateTotals(transactions), [transactions])

  const monthTransactions = useMemo(() => filterTransactionsByMonth(transactions, monthKey), [transactions, monthKey])
  const monthTotals = useMemo(() => calculateTotals(monthTransactions), [monthTransactions])
  const trend = useMemo(
    () => groupTotalsByMonth(transactions, getRecentMonthKeys(TREND_MONTHS, monthKey)),
    [transactions, monthKey],
  )
  const categoryData = useMemo(() => groupExpensesByCategory(monthTransactions), [monthTransactions])
  const recent = transactions.slice(0, 5)
  const monthLabel = formatMonthLabel(monthKey)
  const showEmptyState = !loading && !error && transactions.length === 0

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        subtitle={`Your financial overview for ${monthLabel}`}
        actions={
          <>
            <MonthSelector id="dashboard-month" value={monthKey} onChange={setMonthKey} />
            <button type="button" onClick={() => setFormOpen(true)} className={primaryButtonClass}>
              <Plus className="h-4 w-4" />
              Add transaction
            </button>
          </>
        }
      />

      {error && <ErrorMessage message={error} onRetry={reload} />}

      {loading ? (
        <Spinner label="Loading your dashboard..." />
      ) : (
        <>
          <SummaryCards totals={totals} monthTotals={monthTotals} monthLabel={monthLabel} />

          {showEmptyState ? (
            <div className={cardClass}>
              <EmptyState
                icon={Wallet}
                title="No transactions yet"
                description="Add your first income or expense to see your totals, charts, and recent activity here."
                action={
                  <button type="button" onClick={() => setFormOpen(true)} className={primaryButtonClass}>
                    <Plus className="h-4 w-4" />
                    Add your first transaction
                  </button>
                }
              />
            </div>
          ) : (
            <>
              <div className="grid gap-6 xl:grid-cols-3">
                <Panel
                  title="Income vs expenses"
                  subtitle={`Last ${TREND_MONTHS} months up to ${monthLabel}`}
                  className="xl:col-span-2"
                >
                  <IncomeExpenseChart data={trend} />
                </Panel>
                <Panel title="Expenses by category" subtitle={monthLabel}>
                  <CategoryPieChart data={categoryData} />
                </Panel>
              </div>

              <Panel
                title="Recent transactions"
                subtitle="Your five most recent entries"
                action={
                  <Link to="/transactions" className={secondaryButtonClass}>
                    View all
                  </Link>
                }
              >
                <TransactionTable transactions={recent} />
              </Panel>
            </>
          )}
        </>
      )}

      <TransactionEditorModal
        open={formOpen}
        transaction={null}
        onClose={() => setFormOpen(false)}
        onSave={(values) => addTransaction(values)}
      />
    </div>
  )
}
