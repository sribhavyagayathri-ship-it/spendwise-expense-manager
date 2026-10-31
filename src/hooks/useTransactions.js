import { useCallback, useEffect, useState } from 'react'
import {
  createTransaction,
  deleteTransaction,
  fetchTransactions,
  updateTransaction,
} from '../lib/transactionService'
import { getErrorMessage } from '../lib/errors'

export function useTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setError('')
    try {
      setTransactions(await fetchTransactions())
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const addTransaction = useCallback(
    async (values) => {
      await createTransaction(values)
      await load()
    },
    [load],
  )

  const editTransaction = useCallback(
    async (id, values) => {
      await updateTransaction(id, values)
      await load()
    },
    [load],
  )

  const removeTransaction = useCallback(
    async (id) => {
      await deleteTransaction(id)
      await load()
    },
    [load],
  )

  return {
    transactions,
    loading,
    error,
    reload: load,
    addTransaction,
    editTransaction,
    removeTransaction,
  }
}
