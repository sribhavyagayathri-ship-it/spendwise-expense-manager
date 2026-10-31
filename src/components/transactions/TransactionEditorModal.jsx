import { useState } from 'react'
import { useToast } from '../../hooks/useToast'
import { getErrorMessage } from '../../lib/errors'
import { createFormValues } from '../../lib/transactionForm'
import Modal from '../common/Modal'
import TransactionForm from './TransactionForm'

export default function TransactionEditorModal({ open, transaction, onClose, onSave }) {
  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const isEditing = Boolean(transaction)

  async function handleSubmit(values) {
    setSaving(true)
    try {
      await onSave(values, transaction)
      toast.success(isEditing ? 'Transaction updated.' : 'Transaction added.')
      onClose()
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal open={open} title={isEditing ? 'Edit transaction' : 'Add transaction'} onClose={onClose}>
      <TransactionForm
        initialValues={createFormValues(transaction)}
        submitLabel={isEditing ? 'Save changes' : 'Add transaction'}
        submitting={saving}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  )
}
