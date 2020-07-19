import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TimeEntriesList } from './TimeEntriesList'

describe('TimeEntriesList', () => {
  const records = [
    { id: 0, start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: 'Did stuff' },
    { id: 1, start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: 'More stuff' },
  ]

  let updateTimeEntry: jest.Mock

  beforeEach(() => {
    updateTimeEntry = jest.fn().mockName('updateTimeEntry')

    //@ts-ignore
    render(<TimeEntriesList timeEntries={records} updateTimeEntry={updateTimeEntry} />)
  })

  it('Displays time entries', () => {
    expect(screen.queryByDisplayValue('09:00 AM')).not.toBeNull()
    expect(screen.queryAllByDisplayValue('10:00 AM')[0]).not.toBeNull()

    expect(screen.queryAllByDisplayValue('10:00 AM')[1]).not.toBeNull()
    expect(screen.queryByDisplayValue('03:15 PM')).not.toBeNull()

    expect(screen.queryByDisplayValue('1234')).not.toBeNull()
    expect(screen.queryByDisplayValue('4321')).not.toBeNull()

    expect(screen.queryByDisplayValue('Did stuff')).not.toBeNull()
    expect(screen.queryByDisplayValue('More stuff')).not.toBeNull()
  })

  it('Allows modification of time entries', () => {
    let start0 = screen.getAllByRole('textbox', { name: 'Start' })[0]
    let end0 = screen.getAllByRole('textbox', { name: 'End' })[0]
    let ticket0 = screen.getAllByRole('textbox', { name: 'Ticket' })[0]
    let details0 = screen.getAllByRole('textbox', { name: 'Details' })[0]

    // userEvent.type(start0, '10:00 AM')
    fireEvent.change(start0, { target: { value: '10:00 AM' } })
    expect(updateTimeEntry).toHaveBeenCalledWith({ id: 0, property: 'start', newValue: '10:00 AM' })

    // userEvent.type(end0, '10:15 AM')
    fireEvent.change(end0, { target: { value: '10:15 AM' } })
    expect(updateTimeEntry).toHaveBeenCalledWith({ id: 0, property: 'end', newValue: '10:15 AM' })

    // userEvent.type(ticket0, 'ABC-123')
    fireEvent.change(ticket0, { target: { value: 'ABC-123' } })
    expect(updateTimeEntry).toHaveBeenCalledWith({ id: 0, property: 'ticket', newValue: 'ABC-123' })

    // userEvent.type(details0, 'Ranted about customer')
    fireEvent.change(details0, { target: { value: 'Ranted about customer' } })
    expect(updateTimeEntry).toHaveBeenCalledWith({ id: 0, property: 'details', newValue: 'Ranted about customer' })
  })
})