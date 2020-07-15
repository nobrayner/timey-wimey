import { addTimeEntry } from '../../src/features/timeentries/timeEntriesSlice'

describe('Time Entries', () => {
  it('Can display time entries', () => {
    const timeEntries = [
      { start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: 'Did stuff' },
      { start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: 'More stuff' },
    ]

    cy.visit('/')

    cy.window().its('store').then(store => {
      store.dispatch(addTimeEntry(timeEntries[0]))
      store.dispatch(addTimeEntry(timeEntries[1]))
    })

    cy.get('#timeEntry_0 input[name^=\'start\']').should('have.value', '09:00 AM')
    cy.get('#timeEntry_1 input[name^=\'start\']').should('have.value', '10:00 AM')

    cy.get('#timeEntry_0 input[name^=\'end\']').should('have.value', '10:00 AM')
    cy.get('#timeEntry_1 input[name^=\'end\']').should('have.value', '03:15 PM')

    cy.get('#timeEntry_0 input[name^=\'ticket\']').should('have.value', '1234')
    cy.get('#timeEntry_1 input[name^=\'ticket\']').should('have.value', '4321')

    cy.get('#timeEntry_0 input[name^=\'details\']').should('have.value', 'Did stuff')
    cy.get('#timeEntry_1 input[name^=\'details\']').should('have.value', 'More stuff')
  })
})