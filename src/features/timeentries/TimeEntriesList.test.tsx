import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TimeEntriesList } from './TimeEntriesList'

describe('TimeEntriesList', () => {
  it('Displays time entries', () => {
    const timeEntries = [
      { id: 0, start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: 'Did stuff' },
      { id: 1, start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: 'More stuff' },
    ]

    const { queryByDisplayValue, queryAllByDisplayValue } = render(<TimeEntriesList timeEntries={timeEntries} />)

    expect(queryByDisplayValue('09:00 AM')).not.toBeNull()
    expect(queryAllByDisplayValue('10:00 AM')[0]).not.toBeNull()

    expect(queryAllByDisplayValue('10:00 AM')[1]).not.toBeNull()
    expect(queryByDisplayValue('03:15 PM')).not.toBeNull()

    expect(queryByDisplayValue('1234')).not.toBeNull()
    expect(queryByDisplayValue('4321')).not.toBeNull()

    expect(queryByDisplayValue('Did stuff')).not.toBeNull()
    expect(queryByDisplayValue('More stuff')).not.toBeNull()
  })

  it('Allows modification of time entries', () => {
    const timeEntries = [
      { id: 0, start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: 'Did stuff' },
      { id: 1, start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: 'More stuff' },
    ]

    const { getAllByRole } = render(<TimeEntriesList timeEntries={timeEntries} />)

    let start0 = getAllByRole('textbox', { name: 'Start' })[0]
    let end0 = getAllByRole('textbox', { name: 'End' })[0]
    let ticket0 = getAllByRole('textbox', { name: 'Ticket' })[0]
    let details0 = getAllByRole('textbox', { name: 'Details' })[0]

    userEvent.clear(start0)
    userEvent.type(start0, '10:00 AM')
    expect(start0).toHaveValue('10:00 AM')

    userEvent.clear(end0)
    userEvent.type(end0, '10:15 AM')
    expect(end0).toHaveValue('10:15 AM')

    userEvent.clear(ticket0)
    userEvent.type(ticket0, 'ABC-123')
    expect(ticket0).toHaveValue('ABC-123') 

    userEvent.clear(details0)
    userEvent.type(details0, 'Ranted about customer')
    expect(details0).toHaveValue('Ranted about customer')
  })
})