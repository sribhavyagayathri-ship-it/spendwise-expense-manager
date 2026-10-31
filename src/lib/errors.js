const LINK_EXPIRED_MESSAGE = 'Your password reset link has expired or was already used. Request a new one.'
const RATE_LIMIT_MESSAGE = 'Too many attempts. Wait a few minutes and try again.'
const SESSION_MISSING_MESSAGE = 'Auth session missing!'

const AUTH_CODE_MESSAGES = new Map([
  ['invalid_credentials', 'Email or password is incorrect.'],
  ['user_already_exists', 'An account with this email already exists.'],
  ['email_exists', 'An account with this email already exists.'],
  ['email_not_confirmed', 'Please confirm your email address before signing in.'],
  ['same_password', 'Choose a password you have not used before.'],
  ['weak_password', 'This password is too weak. Use a longer password that is harder to guess.'],
  ['reauthentication_needed', 'For your security, request a new reset link to change your password.'],
  ['over_request_rate_limit', RATE_LIMIT_MESSAGE],
  ['over_email_send_rate_limit', RATE_LIMIT_MESSAGE],
  ['request_timeout', 'The request took too long. Please try again.'],
])

const RECOVERY_LINK_CODES = new Set(['session_not_found', 'session_expired', 'bad_jwt', 'no_authorization', 'otp_expired'])

const NETWORK_MESSAGE = 'Could not reach the server. Check your internet connection and try again.'
const GENERIC_MESSAGE = 'Something went wrong. Please try again.'

function isNetworkError(error) {
  return error instanceof TypeError || /failed to fetch|network/i.test(error?.message ?? '')
}

export function getErrorMessage(error) {
  if (isNetworkError(error)) return NETWORK_MESSAGE
  if (error?.code === '42501') return 'You do not have permission to do that.'
  return GENERIC_MESSAGE
}

export function isRecoveryLinkError(error) {
  return RECOVERY_LINK_CODES.has(error?.code) || error?.message === SESSION_MISSING_MESSAGE
}

export function getAuthErrorMessage(error) {
  if (AUTH_CODE_MESSAGES.has(error?.code)) return AUTH_CODE_MESSAGES.get(error.code)
  if (isRecoveryLinkError(error)) return LINK_EXPIRED_MESSAGE
  if (error?.name === 'AuthApiError' && error.message) return error.message
  return getErrorMessage(error)
}
