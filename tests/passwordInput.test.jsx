// @vitest-environment jsdom
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import PasswordInput from '../src/components/common/PasswordInput'

afterEach(cleanup)

function Harness({ onSubmit }) {
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="first-pw">First</label>
      <PasswordInput id="first-pw" value={first} onChange={(e) => setFirst(e.target.value)} />
      <label htmlFor="second-pw">Second</label>
      <PasswordInput id="second-pw" value={second} onChange={(e) => setSecond(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}

describe('PasswordInput', () => {
  it('keeps the password hidden by default', () => {
    render(<Harness onSubmit={vi.fn()} />)
    expect(screen.getByLabelText('First').type).toBe('password')
    expect(screen.getAllByRole('button', { name: 'Show password' })).toHaveLength(2)
  })

  it('toggles between hidden and visible text', () => {
    render(<Harness onSubmit={vi.fn()} />)
    const input = screen.getByLabelText('First')
    const [toggle] = screen.getAllByRole('button', { name: 'Show password' })

    fireEvent.click(toggle)
    expect(input.type).toBe('text')
    expect(screen.getAllByRole('button', { name: 'Hide password' })).toHaveLength(1)

    fireEvent.click(screen.getByRole('button', { name: 'Hide password' }))
    expect(input.type).toBe('password')
  })

  it('does not submit the form when the eye button is clicked', () => {
    const onSubmit = vi.fn((event) => event.preventDefault())
    render(<Harness onSubmit={onSubmit} />)
    fireEvent.click(screen.getAllByRole('button', { name: 'Show password' })[0])
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('reveals and hides each field independently', () => {
    render(<Harness onSubmit={vi.fn()} />)
    fireEvent.click(screen.getAllByRole('button', { name: 'Show password' })[0])
    expect(screen.getByLabelText('First').type).toBe('text')
    expect(screen.getByLabelText('Second').type).toBe('password')
  })
})
