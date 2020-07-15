import { addTimeEntry } from '../../src/features/timeentries/timeEntriesSlice'

describe('Time Entries', () => {
  it('Can display time entries', () => {
    const timeEntries = [
      { id: 0, start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: 'Did stuff' },
      { id: 1, start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: 'More stuff' },
    ]

    cy.visit('/')

    cy.window().its('store').then(store => {
      store.dispatch(addTimeEntry(timeEntries[0]))
      store.dispatch(addTimeEntry(timeEntries[1]))
    })

    cy.get('#timeEntry_0').contains('09:00 AM')
    cy.get('#timeEntry_1').contains('10:00 AM')

    cy.get('#timeEntry_0').contains('10:00 AM')
    cy.get('#timeEntry_1').contains('03:15 PM')

    cy.get('#timeEntry_0').contains('1234')
    cy.get('#timeEntry_1').contains('4321')

    cy.get('#timeEntry_0').contains('Did stuff')
    cy.get('#timeEntry_1').contains('More stuff')
  })
})