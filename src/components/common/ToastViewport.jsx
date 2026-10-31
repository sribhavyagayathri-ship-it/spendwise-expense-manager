import { CheckCircle2, CircleAlert, X } from 'lucide-react'

export default function ToastViewport({ toasts, onDismiss }) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-end gap-2 sm:inset-x-auto sm:bottom-6 sm:right-6"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success'
        const Icon = isSuccess ? CheckCircle2 : CircleAlert
        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border bg-white p-4 shadow-lg animate-fade-in sm:w-96 ${
              isSuccess ? 'border-emerald-200' : 'border-rose-200'
            }`}
          >
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${isSuccess ? 'text-emerald-600' : 'text-rose-600'}`} />
            <p className="flex-1 text-sm text-slate-700">{toast.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="text-slate-400 transition hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
