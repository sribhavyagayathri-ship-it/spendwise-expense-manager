export const MIN_PASSWORD_LENGTH = 6

export function getPasswordError(password, confirmPassword) {
  if (password.length < MIN_PASSWORD_LENGTH) return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
  if (password !== confirmPassword) return 'Passwords do not match.'
  return ''
}
