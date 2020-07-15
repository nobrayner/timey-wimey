import { addTimeEntry } from '../../src/features/timeentries/timeEntriesSlice'

describe('Time Entries', () => {
  it('Can display time entries', () => {
    const didStuff = 'Did stuff'
    const moreStuff = 'More stuff'
    const timeEntries = [
      { id: 0, start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: didStuff },
      { id: 1, start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: moreStuff },
    ]

    cy.visit('/')

    cy.window().its('store').then(store => {
      store.dispatch(addTimeEntry(timeEntries[0]))
      store.dispatch(addTimeEntry(timeEntries[1]))
    })

    cy.contains(didStuff)
    cy.contains(moreStuff)
  })
})