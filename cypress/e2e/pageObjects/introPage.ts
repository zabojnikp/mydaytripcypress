const citySelectDropdownItem = '.sc-81955445-4' // add data-cy on dropdown items to make it more stable
const monthPickerSelector = '[data-cy=monthYearValue]'
const bookRideButton = '[data-cy=book-button]'
const departureDatePicker = '[data-cy=departureDate]'
const originCityInput = '[data-cy=fromSelect]'
const destinationCityInput = '[data-cy=toSelect]'

// TBD: there are 2 elements with the same data-cy for booking the trip on this page (on tope page and lower down)
// I would prefer unique data-cy for each container, instead of using 'first()' command, e.g. cy.get(bookRideButton).first().click() -> cy.get(bookRideTopContainer).click()

export const selectOriginCity = (city: string) => {
    cy.intercept('GET', '/graphql?**operationName=FindLocationsBySearchString**', { fixture: 'findLocationsBySearchString' }).as('findOriginCityQuery')
    cy.get(originCityInput).first().type(city).wait('@findOriginCityQuery') 
    cy.contains(citySelectDropdownItem, city).click()
    cy.get(originCityInput).first().should('have.value', city)
}
export const selectDestinationCity = (city: string) => {
    // selecting destination city sometimes fails with `"invalid_destination_location", would need to understand how graphql queries are designed to make it more stable
    cy.intercept('GET', '/graphql?**operationName=FindLocationsBySearchString**', { fixture: 'findLocationsBySearchString' }).as('findDestinationCityQuery')
    cy.intercept("GET", '/graphql?**operationName=GetRouteSelectorDestinationLocationsBySearchString**', {fixture: 'routeSelectorDestinationLocationsBySearchString.json'}).as('findRouteQuery')
    cy.get(destinationCityInput).first().type(city).wait(['@findDestinationCityQuery', '@findRouteQuery']) 
    cy.contains(citySelectDropdownItem, city).click()
    cy.get(destinationCityInput).first().should('have.value', city)
}

// this function needs to be updated to work also with upcoming months
export const selectDepartureDate = () => {
    cy.get(monthPickerSelector).should('be.visible')
    cy.get(`[data-cy="${Cypress.env('departureDate').getDate()}"]`).click()
    cy.assertDateSelectorContainsSetDate(departureDatePicker)
}

export const searchRide = () => {
    cy.intercept('GET', '/graphql?**operationName=RouteReviews**').as('RouteReviews')
    cy.intercept('GET', '/graphql?**operationName=UpsellSimpleRoutes**').as('UpsellSimpleRoutes')
    cy.intercept('GET', '/graphql?**operationName=GetFrequentlyAskedQuestions**').as('GetFrequentlyAskedQuestions')
    cy.intercept('GET', '/graphql?**operationName=RouteForBookingById**').as('RouteForBookingById')

    cy.get(bookRideButton).first().click().wait(['@RouteReviews', '@UpsellSimpleRoutes', '@GetFrequentlyAskedQuestions', '@RouteForBookingById'])
}