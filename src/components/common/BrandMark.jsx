import { Wallet } from 'lucide-react'

export default function BrandMark({ light = true }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
        <Wallet className="h-5 w-5" />
      </span>
      <span className={`text-lg font-semibold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
        SpendWise
      </span>
    </div>
  )
}
