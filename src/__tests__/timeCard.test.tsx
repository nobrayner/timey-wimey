import React from 'react'
import TimeCardDisplay from '../components/timeCard'
import { render, screen, timeCardBuilder } from '../test-utils'

describe('TimeCardDisplay', () => {
  it('displays all values', () => {
    const card = timeCardBuilder()
    render(<TimeCardDisplay card={card} />)

    expect(screen.getByLabelText(/start/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/start/i)).toHaveValue(`${card.start?.getHours().toString().padStart(2, '0')}:${card.start?.getMinutes().toString().padStart(2, '0')}`)

    expect(screen.getByLabelText(/end/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/end/i)).toHaveValue(`${card.end?.getHours().toString().padStart(2, '0')}:${card.end?.getMinutes().toString().padStart(2, '0')}`)

    expect(screen.getByLabelText(/ticket/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ticket/i)).toHaveValue(card.ticket)

    expect(screen.getByLabelText(/details/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/details/i)).toHaveValue(card.details)
  })
})