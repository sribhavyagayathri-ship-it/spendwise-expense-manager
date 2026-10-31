import { useMemo, useState } from 'react'
import { Plus, Receipt, Search } from 'lucide-react'
import { useTransactions } from '../hooks/useTransactions'
import { useToast } from '../hooks/useToast'
import { getErrorMessage } from '../lib/errors'
import { applyTransactionFilters, DEFAULT_FILTERS } from '../lib/transactionFilters'
import { primaryButtonClass, secondaryButtonClass } from '../lib/styles'
import PageHeader from '../components/common/PageHeader'
import EmptyState from '../components/common/EmptyState'
import ErrorMessage from '../components/common/ErrorMessage'
import ConfirmDialog from '../components/common/ConfirmDialog'
import Spinner from '../components/common/Spinner'
import TransactionEditorModal from '../components/transactions/TransactionEditorModal'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'

export default function TransactionsPage() {
  const { transactions, loading, error, reload, addTransaction, editTransaction, removeTransaction } =
    useTransactions()
  const toast = useToast()
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [deleteBusy, setDeleteBusy] = useState(false)

  const visible = useMemo(() => applyTransactionFilters(transactions, filters), [transactions, filters])
  const hasActiveFilters = Boolean(
    filters.search || filters.type || filters.category || filters.month || filters.dateFrom || filters.dateTo,
  )

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(transaction) {
    setEditing(transaction)
    setFormOpen(true)
  }

  function clearFilters() {
    setFilters((prev) => ({ ...DEFAULT_FILTERS, sort: prev.sort }))
  }

  async function handleDelete() {
    setDeleteBusy(true)
    try {
      await removeTransaction(deleting.id)
      toast.success('Transaction deleted.')
      setDeleting(null)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setDeleteBusy(false)
    }
  }

  function renderContent() {
    if (loading) return <Spinner label="Loading transactions..." />
    if (error) return <div className="p-5"><ErrorMessage message={error} onRetry={reload} /></div>
    if (transactions.length === 0) {
      return (
        <EmptyState
          icon={Receipt}
          title="No transactions yet"
          description="Record your income and expenses to start seeing your balance and reports."
          action={
            <button type="button" onClick={openCreate} className={primaryButtonClass}>
              <Plus className="h-4 w-4" />
              Add transaction
            </button>
          }
        />
      )
    }
    if (visible.length === 0) {
      return (
        <EmptyState
          icon={Search}
          title="No matching transactions"
          description="Try a different search or clear your filters to see everything."
          action={
            <button type="button" onClick={clearFilters} className={secondaryButtonClass}>
              Clear filters
            </button>
          }
        />
      )
    }
    return <TransactionTable transactions={visible} onEdit={openEdit} onDelete={setDeleting} />
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Transactions"
        subtitle={`${visible.length} of ${transactions.length} transactions shown`}
        actions={
          <button type="button" onClick={openCreate} className={primaryButtonClass}>
            <Plus className="h-4 w-4" />
            Add transaction
          </button>
        }
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <TransactionFilters filters={filters} onChange={setFilters} />
        {hasActiveFilters && (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{renderContent()}</div>

      <TransactionEditorModal
        open={formOpen}
        transaction={editing}
        onClose={() => setFormOpen(false)}
        onSave={(values, transaction) =>
          transaction ? editTransaction(transaction.id, values) : addTransaction(values)
        }
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete transaction?"
        message={`"${deleting?.description ?? ''}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        busy={deleteBusy}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  )
}
