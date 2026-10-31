import { BarChart3 } from 'lucide-react'
import BrandMark from '../common/BrandMark'

export default function AuthCard({ title, subtitle, footer, children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden flex-col justify-between bg-navy-900 p-12 text-white lg:flex lg:w-[45%]">
        <BrandMark />
        <div className="max-w-md">
          <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <BarChart3 className="h-6 w-6 text-emerald-400" />
          </span>
          <h2 className="text-3xl font-semibold leading-tight">Know where every rupee goes.</h2>
          <p className="mt-4 text-base text-slate-300">
            Track income and expenses, understand your spending by category, and watch your monthly savings grow.
          </p>
        </div>
        <p className="text-sm text-slate-400">Personal expense management for students and professionals.</p>
      </aside>

      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center lg:hidden">
            <BrandMark light={false} />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">{footer}</p>
        </div>
      </div>
    </div>
  )
}
