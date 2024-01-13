Cypress.Commands.add('assertDateSelectorContainsSetDate', (selector: string) => {
    cy.get(selector).should('contain', Cypress.env('departureDate').toLocaleString('en-US', { weekday: 'short', day: "numeric", month: "short"}))
})

Cypress.Commands.add('setDepartureDateValue', (daysFromToday: number) => {
    const departureDate = new Date()
    departureDate.setDate(departureDate.getDate() + daysFromToday)
    Cypress.env('departureDate', departureDate)
})
