import { supabase } from './supabase'

const TABLE = 'transactions'
const COLUMNS = 'id, description, amount, type, category, transaction_date, notes, created_at'

function toRow(values) {
  return {
    description: values.description.trim(),
    amount: Number(values.amount),
    type: values.type,
    category: values.category,
    transaction_date: values.date,
    notes: values.notes.trim() || null,
  }
}

export async function fetchTransactions() {
  const { data, error } = await supabase
    .from(TABLE)
    .select(COLUMNS)
    .order('transaction_date', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createTransaction(values) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(toRow(values))
    .select(COLUMNS)
    .single()

  if (error) throw error
  return data
}

export async function updateTransaction(id, values) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(toRow(values))
    .eq('id', id)
    .select(COLUMNS)
    .single()

  if (error) throw error
  return data
}

export async function deleteTransaction(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
