import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewTimeEntryButton } from './NewTimeEntryButton'

describe('NewTimeEntryButton', () => {
  it('Adds a new time entry when clicked', () => {
    const addTimeEntry = jest.fn().mockName('addTimeEntry')

    //@ts-ignore
    render(<NewTimeEntryButton addTimeEntry={addTimeEntry} />)

    userEvent.click(screen.getByRole('button', { name: '+ New Entry' }))
    expect(addTimeEntry).toHaveBeenCalledTimes(1)
  })

  it('Cannot add new entry until last entry is complete', () => {
    const addTimeEntry = jest.fn().mockName('addTimeEntry')

    const timeEntry = { id: 0, start: '', end: '', ticket: '', details: '' }

    //@ts-ignore
    const { rerender } = render(<NewTimeEntryButton lastEntry={timeEntry} addTimeEntry={addTimeEntry} />)
    expect(screen.getByRole('button', { name: '+ New Entry' })).toHaveAttribute('disabled')

    timeEntry.start = '09:00 AM'
    //@ts-ignore
    rerender(<NewTimeEntryButton lastEntry={timeEntry} addTimeEntry={addTimeEntry} />)
    expect(screen.getByRole('button', { name: '+ New Entry' })).toHaveAttribute('disabled')

    timeEntry.end = '10:00 AM'
    //@ts-ignore
    rerender(<NewTimeEntryButton lastEntry={timeEntry} addTimeEntry={addTimeEntry} />)
    expect(screen.getByRole('button', { name: '+ New Entry' })).toHaveAttribute('disabled')

    timeEntry.ticket = '1234'
    //@ts-ignore
    rerender(<NewTimeEntryButton lastEntry={timeEntry} addTimeEntry={addTimeEntry} />)
    expect(screen.getByRole('button', { name: '+ New Entry' })).toHaveAttribute('disabled')

    timeEntry.details = 'Did stuff'
    //@ts-ignore
    rerender(<NewTimeEntryButton lastEntry={timeEntry} addTimeEntry={addTimeEntry} />)
    expect(screen.getByRole('button', { name: '+ New Entry' })).not.toHaveAttribute('disabled')
  })
})