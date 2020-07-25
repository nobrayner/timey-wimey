import { addTimeEntry } from '../../src/features/timeentries/timeEntriesSlice'

describe('Time Wimey', () => {
  beforeEach(() => cy.visit('/'))

  it('Can display time entries', () => {
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
    cy.get('#timeEntry_0 input[id^=\'start\']').clear().type('09:30 AM').should('have.value', '09:30 AM')
    cy.get('#timeEntry_0 input[id^=\'end\']').clear().type('09:45 AM').should('have.value', '09:45 AM')
    cy.get('#timeEntry_0 input[id^=\'ticket\']').clear().type('ABC-123').should('have.value', 'ABC-123')
    cy.get('#timeEntry_0 input[id^=\'details\']').clear().type('Ranted about client').should('have.value', 'Ranted about client')

    cy.get('#timeEntry_1 input[id^=\'start\']').clear().type('09:45 AM').should('have.value', '09:45 AM')
    cy.get('#timeEntry_1 input[id^=\'end\']').clear().type('12:00 PM').should('have.value', '12:00 PM')
    cy.get('#timeEntry_1 input[id^=\'ticket\']').clear().type('ZYX-321').should('have.value', 'ZYX-321')
    cy.get('#timeEntry_1 input[id^=\'details\']').clear().type('Exploited bananas').should('have.value', 'Exploited bananas')
  })

  it('Can add a time entry', () => {
    cy.get('[id^=\'timeEntry_\']').as('timeEntries').should('have.length', 2)

    cy.contains('+ New Entry').click()

    cy.get('@timeEntries').should('have.length', 3)

    cy.get('#timeEntry_2 input[id^=\'start\']').should($input => {
      let now = new Date()
      let val = $input.first().attr('value')

      if (val) {
        let hours = Number(val.split(':')[0])
        let minutes = Number(val.split(' ')[0].split(':')[1])

        let nowHours = now.getHours() % 12
        nowHours = nowHours === 0 ? 12 : nowHours

        expect(hours).to.be.approximately(nowHours, 1)
        expect(minutes).to.be.approximately(now.getMinutes(), 7)
      }
    })
    cy.get('#timeEntry_2 input[id^=\'end\']').should('have.value', '')
    cy.get('#timeEntry_2 input[id^=\'ticket\']').should('have.value', '')
    cy.get('#timeEntry_2 input[id^=\'details\']').should('have.value', '')
  })

  it('Can remove a time entry', () => {
    cy.get('[id^=\'timeEntry_\']').as('timeEntries').should('have.length', 2)

    cy.get('#timeEntry_1 button[id^=\'remove\']').click()

    cy.get('@timeEntries').should('have.length', 1)
  })
})