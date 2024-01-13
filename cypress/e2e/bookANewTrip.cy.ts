import * as introScreen from './pageObjects/introPage'
import * as tripConfiguration from './pageObjects/configurationPage'
import * as tripSummary from './pageObjects/summaryPage'
import * as checkoutPage from './pageObjects/checkoutPage'
import * as confirmationPage from './pageObjects/confirmationPage'

const originCity = "Prague"
const destinationCity = "Berlin"
const pricePerBooking = '318'
const userEmail = 'test@test.com'

describe('Book a trip', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.setDepartureDateValue(14) // 2 weeks from today
  })

  it('with a cash option', () => {
    introScreen.selectOriginCity(originCity)
    introScreen.selectDestinationCity(destinationCity)
    introScreen.selectDepartureDate()
    introScreen.searchRide()
    
    tripConfiguration.assertTripDetails(originCity, destinationCity, pricePerBooking)
    tripConfiguration.submitTripDetails()
    
    tripSummary.assertTripDetails(originCity, destinationCity, pricePerBooking)
    tripSummary.addUserEmail(userEmail)
    tripSummary.confirmBooking()
    
    checkoutPage.assertTripDetails(originCity, destinationCity, pricePerBooking)
    checkoutPage.fillInPassengerDetails("Test", "Surname")
    checkoutPage.selectPaymentMethod('cash')
    checkoutPage.assertPaymentPrice(pricePerBooking)
    checkoutPage.confirmBooking()
    
    confirmationPage.assertBookingConfirmed(userEmail)
  })
})