import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { fieldClass } from '../../lib/styles'

export default function PasswordInput({ id, name, value, onChange, autoComplete }) {
  const [visible, setVisible] = useState(false)
  const Icon = visible ? EyeOff : Eye

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? 'text' : 'password'}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`${fieldClass} w-full pr-11`}
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-controls={id}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 transition hover:text-slate-700 focus:outline-none focus-visible:text-blue-600"
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}
