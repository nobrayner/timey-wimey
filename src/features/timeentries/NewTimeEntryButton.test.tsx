import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewTimeEntryButton } from './NewTimeEntryButton'

describe('NewTimeEntryButton', () => {
  it('Adds a new time entry when clicked', () => {
    const addTimeEntry = jest.fn().mockName('addTimeEntry')

    //@ts-ignore
    render(<NewTimeEntryButton canAddNewEntry={true} addTimeEntry={addTimeEntry} />)

    userEvent.click(screen.getByRole('button', { name: '+ New Entry' }))
    expect(addTimeEntry).toHaveBeenCalledTimes(1)
  })

  it('Cannot be clicked when canAddNewEntry is false', () => {
    const addTimeEntry = jest.fn().mockName('addTimeEntry')

    //@ts-ignore
    render(<NewTimeEntryButton canAddNewEntry={false} addTimeEntry={addTimeEntry} />)

    userEvent.click(screen.getByRole('button', { name: '+ New Entry' }))
    expect(addTimeEntry).not.toHaveBeenCalled()
  })
})