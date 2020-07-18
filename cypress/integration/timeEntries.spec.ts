import { addTimeEntry } from '../../src/features/timeentries/timeEntriesSlice'

describe('Time Wimey', () => {
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
    cy.get('[id^=\'timeEntry_\']').should('have.length', 2)

    cy.get('#timeEntry_0 input[name^=\'start\']').should('have.value', '09:00 AM')
    cy.get('#timeEntry_1 input[name^=\'start\']').should('have.value', '10:00 AM')

    cy.get('#timeEntry_0 input[name^=\'end\']').should('have.value', '10:00 AM')
    cy.get('#timeEntry_1 input[name^=\'end\']').should('have.value', '03:15 PM')

    cy.get('#timeEntry_0 input[name^=\'ticket\']').should('have.value', '1234')
    cy.get('#timeEntry_1 input[name^=\'ticket\']').should('have.value', '4321')

    cy.get('#timeEntry_0 input[name^=\'details\']').should('have.value', 'Did stuff')
    cy.get('#timeEntry_1 input[name^=\'details\']').should('have.value', 'More stuff')
  })

  it('Can edit time entries', () => {
    const timeEntries = [
      { start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: 'Did stuff' },
      { start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: 'More stuff' },
    ]

    cy.visit('/')

    cy.window().its('store').then(store => {
      store.dispatch(addTimeEntry(timeEntries[0]))
      store.dispatch(addTimeEntry(timeEntries[1]))
    })
    cy.get('[id^=\'timeEntry_\']').should('have.length', 2)

    cy.get('#timeEntry_0 input[name^=\'start\']').clear().type('09:30 AM').should('have.value', '09:30 AM')
    cy.get('#timeEntry_0 input[name^=\'end\']').clear().type('09:45 AM').should('have.value', '09:45 AM')
    cy.get('#timeEntry_0 input[name^=\'ticket\']').clear().type('ABC-123').should('have.value', 'ABC-123')
    cy.get('#timeEntry_0 input[name^=\'details\']').clear().type('Ranted about client').should('have.value', 'Ranted about client')

    cy.get('#timeEntry_1 input[name^=\'start\']').clear().type('09:45 AM').should('have.value', '09:45 AM')
    cy.get('#timeEntry_1 input[name^=\'end\']').clear().type('12:00 PM').should('have.value', '12:00 PM')
    cy.get('#timeEntry_1 input[name^=\'ticket\']').clear().type('ZYX-321').should('have.value', 'ZYX-321')
    cy.get('#timeEntry_1 input[name^=\'details\']').clear().type('Exploited bananas').should('have.value', 'Exploited bananas')
  })
})