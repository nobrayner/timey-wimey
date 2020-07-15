import React from 'react'
import { render } from '@testing-library/react'
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
})