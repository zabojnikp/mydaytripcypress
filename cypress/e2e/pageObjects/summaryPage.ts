const userEmail = '#lead-passenger-email'
const saveButton = '[data-cy=saveAndContinue]'
const priceSummary = '[data-cy=summaryTotalPrice]'
const citySelector = 'h6' // use data-cy instead
const departureDateInfo = '.sc-6fa42ded-2' // use data-cy instead

export const addUserEmail = (email: string) => {
    cy.get(userEmail).type(email)
    cy.get(userEmail).should('have.value', email)
}

export const confirmBooking  = () => {
    cy.get(saveButton).click()
}

export const assertTripDetails = (originCity: string, destinationCity: string, bookingPrice: string) => {
    cy.get(citySelector, { timeout: 8000 }).should('contain', originCity)
    cy.get(citySelector).should('contain', destinationCity)
    cy.assertDateSelectorContainsSetDate(departureDateInfo)
    cy.get(priceSummary).should('contain', bookingPrice)
}
