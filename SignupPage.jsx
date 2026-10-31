import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import AuthCard from '../components/auth/AuthCard'
import FormField from '../components/common/FormField'
import PasswordInput from '../components/common/PasswordInput'
import { getAuthErrorMessage } from '../lib/errors'
import { getPasswordError } from '../lib/passwords'
import { fieldClass, primaryButtonClass } from '../lib/styles'

function validateSignup({ fullName, email, password, confirmPassword }) {
  if (!fullName.trim() || !email.trim() || !password) return 'Please fill in all fields.'
  return getPasswordError(password, confirmPassword)
}

export default function SignupPage() {
  const { signUp } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function updateField(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationError = validateSignup(form)
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)
    setError('')
    const { data, error: authError } = await signUp(form.email.trim(), form.password, form.fullName.trim())

    if (authError) {
      setError(getAuthErrorMessage(authError))
      setSubmitting(false)
      return
    }

    if (!data.session) {
      toast.success('Account created. Please sign in to continue.')
      navigate('/login')
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start tracking your income and expenses in minutes."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 transition hover:text-blue-700">
            Sign in
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
        <FormField id="signup-name" label="Full name">
          <input
            id="signup-name"
            name="fullName"
            autoComplete="name"
            value={form.fullName}
            onChange={updateField}
            className={`${fieldClass} w-full`}
          />
        </FormField>
        <FormField id="signup-email" label="Email">
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={updateField}
            className={`${fieldClass} w-full`}
            placeholder="you@example.com"
          />
        </FormField>
        <FormField id="signup-password" label="Password">
          <PasswordInput
            id="signup-password"
            name="password"
            autoComplete="new-password"
            value={form.password}
            onChange={updateField}
          />
        </FormField>
        <FormField id="signup-confirm" label="Confirm password">
          <PasswordInput
            id="signup-confirm"
            name="confirmPassword"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={updateField}
          />
        </FormField>
        <button type="submit" disabled={submitting} className={`${primaryButtonClass} w-full`}>
          {submitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AuthCard>
  )
}
