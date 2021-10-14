//  https://www.pyszne.pl/en/menu/test-restaurant-selenium?showTestRestaurants=true#checkout

class CheckoutPage {

   fullNameInput() {
      return cy.get("[name='fullName']")
   }

   emailInput() {
      return  cy.get("[name='email']")
   }

   phoneNumberInput() {
      return cy.get("[name='phoneNumber']")
   }

   clickPaymentElement() {
      return cy.get("[data-qa*='payment-element-element']").click()
   }
   
   clickPaypal() {
      return cy.contains("PayPal").click()
   }

   actionBtnDone() {
      return cy.get("[data-qa='payment-modal-action-submit']")
   }

   paymentMethod() {
      return cy.get("[data-qa='payment-method']")
   }

   clickSubmit() {
      return cy.get("[data-qa*='submit']").click()
   }

   clickCancelAndReturn() {
      return cy.get('#content > .intentFooter > .cancelUrl > #cancelLink', { timeout: 15000 }).click()
   }

   clickPaymentDetails() {
      return cy.get("[data-qa='sidebar-overview-details-payment']",  { timeout: 20000 }).click()
   }

   clickCash() {
      return cy.contains("Cash").click()
   }

   submitOrder() {
      return cy.get("[data-qa*='submit-order']")
   }

   orderTotalText() {
      return cy.get("[data-qa*='text'] span")
   }

   

   


   

   
   
   

   
   
   
  

}

export default CheckoutPage;
