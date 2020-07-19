import { addTimeEntry } from '../../src/features/timeentries/timeEntriesSlice'

describe('Time Wimey', () => {
  it('Can display time entries', () => {
    cy.visit('/')

    cy.get('[id^=\'timeEntry_\']').should('have.length', 2)

    cy.get('#timeEntry_0 input[id^=\'start\']').should('have.value', '09:00 AM')
    cy.get('#timeEntry_1 input[id^=\'start\']').should('have.value', '10:00 AM')

    cy.get('#timeEntry_0 input[id^=\'end\']').should('have.value', '10:00 AM')
    cy.get('#timeEntry_1 input[id^=\'end\']').should('have.value', '03:15 PM')

    cy.get('#timeEntry_0 input[id^=\'ticket\']').should('have.value', '1234')
    cy.get('#timeEntry_1 input[id^=\'ticket\']').should('have.value', '4321')

    cy.get('#timeEntry_0 input[id^=\'details\']').should('have.value', 'Did stuff')
    cy.get('#timeEntry_1 input[id^=\'details\']').should('have.value', 'More stuff')
  })

  it('Can edit time entries', () => {
    cy.visit('/')

    cy.get('#timeEntry_0 input[id^=\'start\']').clear().type('09:30 AM').should('have.value', '09:30 AM')
    cy.get('#timeEntry_0 input[id^=\'end\']').clear().type('09:45 AM').should('have.value', '09:45 AM')
    cy.get('#timeEntry_0 input[id^=\'ticket\']').clear().type('ABC-123').should('have.value', 'ABC-123')
    cy.get('#timeEntry_0 input[id^=\'details\']').clear().type('Ranted about client').should('have.value', 'Ranted about client')

    cy.get('#timeEntry_1 input[id^=\'start\']').clear().type('09:45 AM').should('have.value', '09:45 AM')
    cy.get('#timeEntry_1 input[id^=\'end\']').clear().type('12:00 PM').should('have.value', '12:00 PM')
    cy.get('#timeEntry_1 input[id^=\'ticket\']').clear().type('ZYX-321').should('have.value', 'ZYX-321')
    cy.get('#timeEntry_1 input[id^=\'details\']').clear().type('Exploited bananas').should('have.value', 'Exploited bananas')
  })
})