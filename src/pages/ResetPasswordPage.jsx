import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthCard from '../components/auth/AuthCard'
import FormField from '../components/common/FormField'
import LoadingScreen from '../components/common/LoadingScreen'
import PasswordInput from '../components/common/PasswordInput'
import { getAuthErrorMessage, isRecoveryLinkError } from '../lib/errors'
import { getPasswordError } from '../lib/passwords'
import { primaryButtonClass } from '../lib/styles'

export default function ResetPasswordPage() {
  const { user, loading, updatePassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [updated, setUpdated] = useState(false)
  const [linkExpired, setLinkExpired] = useState(false)

  if (loading) return <LoadingScreen />

  if (!user || linkExpired) {
    return (
      <AuthCard
        title="Link expired or invalid"
        subtitle="This password reset link cannot be used."
        footer={
          <>
            Need a new link?{' '}
            <Link to="/forgot-password" className="font-medium text-blue-600 transition hover:text-blue-700">
              Request another reset email
            </Link>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Reset links can only be used once and expire after a short time. Request a new one to continue.
        </p>
      </AuthCard>
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationError = getPasswordError(password, confirmPassword)
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)
    setError('')
    const { error: authError } = await updatePassword(password)
    setSubmitting(false)

    if (authError) {
      if (isRecoveryLinkError(authError)) {
        setLinkExpired(true)
        return
      }
      setError(getAuthErrorMessage(authError))
      return
    }
    setUpdated(true)
  }

  if (updated) {
    return (
      <AuthCard title="Password updated" subtitle="Your password has been changed.">
        <div className="flex flex-col gap-5">
          <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            You can now use your new password to sign in.
          </div>
          <button type="button" onClick={() => navigate('/', { replace: true })} className={`${primaryButtonClass} w-full`}>
            Go to dashboard
          </button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Choose a new password" subtitle="Enter and confirm your new password below.">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {error && (
          <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}
        <FormField id="reset-password" label="New password">
          <PasswordInput
            id="reset-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
          />
        </FormField>
        <FormField id="reset-confirm" label="Confirm new password">
          <PasswordInput
            id="reset-confirm"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
          />
        </FormField>
        <button type="submit" disabled={submitting} className={`${primaryButtonClass} w-full`}>
          {submitting ? 'Updating password...' : 'Update password'}
        </button>
      </form>
    </AuthCard>
  )
}
