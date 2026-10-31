const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

const compactFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  notation: 'compact',
  maximumFractionDigits: 1,
})

function toMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function formatINR(value) {
  return currencyFormatter.format(Number(value) || 0)
}

export function formatCompactINR(value) {
  return compactFormatter.format(Number(value) || 0)
}

export function getMonthKey(isoDate) {
  return isoDate.slice(0, 7)
}

export function getCurrentMonthKey() {
  return toMonthKey(new Date())
}

export function getTodayIso() {
  const now = new Date()
  return `${toMonthKey(now)}-${String(now.getDate()).padStart(2, '0')}`
}

export function getRecentMonthKeys(count, endKey = getCurrentMonthKey()) {
  const [year, month] = endKey.split('-').map(Number)
  return Array.from({ length: count }, (_, index) =>
    toMonthKey(new Date(year, month - 1 - (count - 1 - index), 1)),
  )
}

export function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  })
}

export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
