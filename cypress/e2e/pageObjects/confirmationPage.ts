const bookingReference = '[data-cy=bookingReference]'
const emailInfo = '.sc-8443616-1' // add data-cy
const pageTitle = 'h1' // add data-cy
const documentLink = 'a' // add data-cy

export const assertBookingConfirmed = (email: string) => {
    cy.contains(pageTitle, 'Your booking is confirmed!').should('be.visible') 
    cy.contains(documentLink, 'Download travel document').should('be.visible')
    cy.get(bookingReference).should('be.visible')
    cy.contains('button', 'Manage my bookings').should('be.visible')
    cy.contains(emailInfo, email).should('be.visible')
}