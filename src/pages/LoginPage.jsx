import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthCard from '../components/auth/AuthCard'
import FormField from '../components/common/FormField'
import PasswordInput from '../components/common/PasswordInput'
import { getAuthErrorMessage } from '../lib/errors'
import { fieldClass, primaryButtonClass } from '../lib/styles'

export default function LoginPage() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim() || !password) {
      setError('Enter your email and password.')
      return
    }

    setSubmitting(true)
    setError('')
    const { error: authError } = await signIn(email.trim(), password)
    if (authError) {
      setError(getAuthErrorMessage(authError))
      setSubmitting(false)
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to see your balance and transactions."
      footer={
        <>
          New to SpendWise?{' '}
          <Link to="/signup" className="font-medium text-blue-600 transition hover:text-blue-700">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {error && (
          <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}
        <FormField id="login-email" label="Email">
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={`${fieldClass} w-full`}
            placeholder="you@example.com"
          />
        </FormField>
        <FormField id="login-password" label="Password">
          <PasswordInput
            id="login-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </FormField>
        <div className="text-right">
          <Link to="/forgot-password" className="text-sm font-medium text-blue-600 transition hover:text-blue-700">
            Forgot password?
          </Link>
        </div>
        <button type="submit" disabled={submitting} className={`${primaryButtonClass} w-full`}>
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthCard>
  )
}
