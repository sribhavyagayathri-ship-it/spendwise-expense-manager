import { getRecentMonthKeys, formatMonthLabel } from '../../lib/format'
import { fieldClass } from '../../lib/styles'

export default function MonthSelector({ id, value, onChange, includeAll = false, monthCount = 24 }) {
  const months = getRecentMonthKeys(monthCount).reverse()

  return (
    <select
      id={id}
      aria-label="Select month"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`${fieldClass} cursor-pointer`}
    >
      {includeAll && <option value="">All months</option>}
      {months.map((monthKey) => (
        <option key={monthKey} value={monthKey}>
          {formatMonthLabel(monthKey)}
        </option>
      ))}
    </select>
  )
}
