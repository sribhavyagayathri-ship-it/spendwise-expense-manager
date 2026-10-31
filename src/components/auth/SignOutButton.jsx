import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { getErrorMessage } from '../../lib/errors'
export default function SignOutButton({ className }) {
  const { signOut } = useAuth()
  const toast = useToast()
  const [busy, setBusy] = useState(false)

  async function handleSignOut() {
    setBusy(true)
    const { error } = await signOut()
    if (error) {
      toast.error(getErrorMessage(error))
      setBusy(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={busy}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <LogOut className="h-4 w-4" />
      {busy ? 'Signing out...' : 'Sign out'}
    </button>
  )
}
