import { useMemo } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { summarizeCategories } from '../lib/summary'
import PageHeader from '../components/common/PageHeader'
import ErrorMessage from '../components/common/ErrorMessage'
import Spinner from '../components/common/Spinner'
import CategoryCard from '../components/categories/CategoryCard'

export default function CategoriesPage() {
  const { transactions, loading, error, reload } = useTransactions()

  const expenseSummaries = useMemo(() => summarizeCategories(transactions, 'expense'), [transactions])
  const incomeSummaries = useMemo(() => summarizeCategories(transactions, 'income'), [transactions])

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Categories"
        subtitle="Every transaction belongs to one of these categories. Totals below are all time."
      />

      {error && <ErrorMessage message={error} onRetry={reload} />}

      {loading ? (
        <Spinner label="Loading categories..." />
      ) : (
        <>
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-slate-900">Expense categories</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {expenseSummaries.map((summary) => (
                <CategoryCard key={summary.name} summary={summary} type="expense" />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-slate-900">Income categories</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {incomeSummaries.map((summary) => (
                <CategoryCard key={summary.name} summary={summary} type="income" />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
