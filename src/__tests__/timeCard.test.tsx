import React from 'react'
import TimeCardDisplay from '../components/timeCard'
import { render, screen, timeCardBuilder } from '../test-utils'
import { formatDateTimeAsTimeOnly } from '../utils'

describe('TimeCardDisplay', () => {
  it('displays all values', () => {
    const card = timeCardBuilder()
    render(<TimeCardDisplay card={card} />)

    expect(screen.getByLabelText(/start/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/start/i)).toHaveValue(formatDateTimeAsTimeOnly(card.start))

    expect(screen.getByLabelText(/end/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/end/i)).toHaveValue(formatDateTimeAsTimeOnly(card.end))

    expect(screen.getByLabelText(/ticket/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ticket/i)).toHaveValue(card.ticket)

    expect(screen.getByLabelText(/details/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/details/i)).toHaveValue(card.details)
  })
})