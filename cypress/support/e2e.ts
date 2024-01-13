import './commands'

declare global {
    namespace Cypress {
      interface Chainable {
        assertDateSelectorContainsSetDate(selector: string): Chainable<JQuery<HTMLElement>>
        setDepartureDateValue(daysFromToday: number): Chainable<JQuery<HTMLElement>>
      }
    }
  }


/**
   * before(() => {
   *    I would either seed db or create data through api here for the test to make sure rides exist
   * })
   * after(() => {
   *    clean up db 
   * })
**/
