import { useCallback, useMemo, useRef, useState } from 'react'
import ToastViewport from '../components/common/ToastViewport'
import { ToastContext } from './ToastContext'

const TOAST_DURATION_MS = 4000

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const show = useCallback(
    (type, message) => {
      nextId.current += 1
      const id = nextId.current
      setToasts((prev) => [...prev, { id, type, message }])
      setTimeout(() => dismiss(id), TOAST_DURATION_MS)
    },
    [dismiss],
  )

  const value = useMemo(
    () => ({
      success: (message) => show('success', message),
      error: (message) => show('error', message),
    }),
    [show],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}
