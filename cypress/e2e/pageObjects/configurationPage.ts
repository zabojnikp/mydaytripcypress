const originCitySelector = '[data-cy=fromSelect]'
const destinationCitySelector = '[data-cy=toSelect]'
const departureDatePicker = '[data-cy=departureDate]'
const bookTripButton = '[data-cy=bookTrip]'
const confirmButton = '[data-cy=confirm]'

export const assertTripDetails = (originCity: string, destinationCity: string, bookingPrice: string) => {
    cy.get(originCitySelector).should('have.value', originCity)
    cy.get(destinationCitySelector).should('have.value', destinationCity)
    cy.assertDateSelectorContainsSetDate(departureDatePicker)
    cy.get(bookTripButton).first().should('contain', bookingPrice)
}

export const submitTripDetails = () => {
    cy.get(bookTripButton).first().click({force: true})
    // confirmButton is sometimes disabled loading the state of the button, would need to understand from the developer how the button is designed
    cy.contains(confirmButton, 'Book without sights').click()

}