import React from 'react'
import { render, screen } from '../test-utils'
import userEvent from '@testing-library/user-event'
import App from '../app'

describe('Timey Wimey', () => {
  it('displays the current date as a heading, help text, and a new button when there are no entries', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: new Date().toLocaleDateString() })).toBeInTheDocument()
    expect(screen.getByTestId('helptext')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /\+ new card/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /\+ new card/i })).not.toBeDisabled()
  })

  it('adds a new time card when clicking the \'new\' button', () => {
    render(<App />)

    expect(screen.queryAllByTestId(/^timecard/i)).toHaveLength(0)

    userEvent.click(screen.getByRole('button', { name: /\+ new card/i }))

    expect(screen.queryAllByTestId(/^timecard/i)).toHaveLength(1)
  })
})