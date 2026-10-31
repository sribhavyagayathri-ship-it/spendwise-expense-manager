import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthCard from '../components/auth/AuthCard'
import FormField from '../components/common/FormField'
import { getAuthErrorMessage } from '../lib/errors'
import { fieldClass, primaryButtonClass } from '../lib/styles'

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [sentTo, setSentTo] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setError('Enter the email address you signed up with.')
      return
    }

    setSubmitting(true)
    setError('')
    const { error: authError } = await resetPassword(trimmedEmail)
    setSubmitting(false)

    if (authError) {
      setError(getAuthErrorMessage(authError))
      return
    }
    setSentTo(trimmedEmail)
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="We will email you a link to choose a new password."
      footer={
        <>
          Remembered it?{' '}
          <Link to="/login" className="font-medium text-blue-600 transition hover:text-blue-700">
            Back to sign in
          </Link>
        </>
      }
    >
      {sentTo ? (
        <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          If an account exists for {sentTo}, a password reset link is on its way. Check your inbox and spam folder.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {error && (
            <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}
          <FormField id="forgot-email" label="Email">
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`${fieldClass} w-full`}
              placeholder="you@example.com"
            />
          </FormField>
          <button type="submit" disabled={submitting} className={`${primaryButtonClass} w-full`}>
            {submitting ? 'Sending link...' : 'Send reset link'}
          </button>
        </form>
      )}
    </AuthCard>
  )
}
