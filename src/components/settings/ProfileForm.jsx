import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { getErrorMessage } from '../../lib/errors'
import { fieldClass, primaryButtonClass } from '../../lib/styles'
import FormField from '../common/FormField'

export default function ProfileForm({ initialName }) {
  const { updateFullName } = useAuth()
  const toast = useToast()
  const [name, setName] = useState(initialName)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    const { error } = await updateFullName(name.trim())
    setSaving(false)

    if (error) {
      toast.error(getErrorMessage(error))
    } else {
      toast.success('Profile updated.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormField id="profile-name" label="Display name">
        <input
          id="profile-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className={`${fieldClass} w-full`}
        />
      </FormField>
      <div>
        <button type="submit" disabled={saving} className={primaryButtonClass}>
          {saving ? 'Saving...' : 'Save profile'}
        </button>
      </div>
    </form>
  )
}
