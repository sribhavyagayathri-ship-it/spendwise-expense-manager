import { describe, expect, it } from 'vitest'
import { getAuthErrorMessage, isRecoveryLinkError } from '../src/lib/errors'

const LINK_EXPIRED = 'Your password reset link has expired or was already used. Request a new one.'

describe('getAuthErrorMessage', () => {
  it('maps weak and reused passwords by error code', () => {
    expect(getAuthErrorMessage({ code: 'weak_password', message: 'x' })).toMatch(/too weak/)
    expect(getAuthErrorMessage({ code: 'same_password', message: 'x' })).toBe(
      'Choose a password you have not used before.',
    )
  })

  it('treats expired or missing sessions as an expired reset link', () => {
    expect(getAuthErrorMessage({ code: 'session_not_found', message: 'x' })).toBe(LINK_EXPIRED)
    expect(getAuthErrorMessage({ name: 'AuthSessionMissingError', message: 'Auth session missing!' })).toBe(
      LINK_EXPIRED,
    )
  })

  it('shows the server message for unrecognized API errors', () => {
    const error = { name: 'AuthApiError', code: 'something_new', message: 'Password is too short.' }
    expect(getAuthErrorMessage(error)).toBe('Password is too short.')
  })

  it('falls back to a generic message for unknown errors', () => {
    expect(getAuthErrorMessage({ message: 'boom' })).toBe('Something went wrong. Please try again.')
  })

  it('shows a connection message for network failures', () => {
    expect(getAuthErrorMessage(new TypeError('Failed to fetch'))).toMatch(/Could not reach the server/)
  })
})

describe('isRecoveryLinkError', () => {
  it('flags session errors and ignores ordinary password errors', () => {
    expect(isRecoveryLinkError({ code: 'session_expired' })).toBe(true)
    expect(isRecoveryLinkError({ code: 'weak_password' })).toBe(false)
    expect(isRecoveryLinkError(undefined)).toBe(false)
  })
})
