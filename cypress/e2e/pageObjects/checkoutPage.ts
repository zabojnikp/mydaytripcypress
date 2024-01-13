const firstNameInput = '#adult_0_firstName'
const lastNameInput = '#adult_0_lastName'
const dayInput = '#date-input'
const monthJanuary = '#month-option-0'
const yearInput = '[aria-label="Birthday year"]'
const phoneInput = '#phone'
const summaryPriceInfo = '.sc-bf937c09-3' // use data-cy instead
const departureDateInfo = '.sc-6fa42ded-2' // use data-cy instead
const citySelector = 'h6' // use data-cy instead
const paymentPriceInfo = '.sc-5f20a295-7' // use data-cy instead
const paymentMethodDropdown = '.sc-8f7d163c-1' // use data-cy instead
const paymentMethodOption = '[data-cy=availableOptions]' 
const confirmBookingButton = '[type=submit]'

const paymentType = {
    cash: "Cash",
    card: "Credit/debit card"
} as const;

type PaymentMethod = keyof typeof paymentType;

export const fillInPassengerDetails = (firstName: string, lastName: string) => {
    cy.get(firstNameInput).type(firstName)
    cy.get(lastNameInput).type(lastName)
    cy.get(dayInput).type('10')
    cy.get(monthJanuary).click()
    cy.get(yearInput).type('1950')
    cy.get(phoneInput).type('2123334444')
}

export const assertTripDetails = (originCity: string, destinationCity: string, bookingPrice: string) => {
    cy.get(citySelector).should('contain', originCity)
    cy.get(citySelector).should('contain', destinationCity)
    cy.assertDateSelectorContainsSetDate(departureDateInfo)
    cy.get(summaryPriceInfo).should('contain', bookingPrice)
}

export const selectPaymentMethod = (paymentMethod: PaymentMethod) => {
    cy.get(paymentMethodDropdown).click()
    cy.contains(paymentMethodOption, paymentType[paymentMethod]).click()
    cy.get(paymentMethodDropdown).should('have.text', paymentType[paymentMethod])
}

export const assertPaymentPrice = (bookingPrice: string) => {
    cy.get(paymentPriceInfo).should('contain', bookingPrice)
}

export const confirmBooking = () => {
    cy.intercept('GET', '/graphql?**operationName=GetOrderForConfirmationSummary**').as('GetOrderForConfirmationSummary')
    cy.intercept('GET', '/graphql?**operationName=GetOrderPayments**').as('GetOrderPayments')
    
    cy.get(confirmBookingButton).click().wait(['@GetOrderForConfirmationSummary', '@GetOrderPayments'], {timeout: 8000}) // there are long requests that should be optimized
}