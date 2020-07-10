describe('Smoke test', () => {
  it('can view the home page', () => {
    cy.visit('/')
    cy.contains('Please click the "+ New Entry" button to add a time entry')
  })
})