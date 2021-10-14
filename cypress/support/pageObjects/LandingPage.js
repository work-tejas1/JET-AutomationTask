//  https://www.pyszne.pl/en/menu/test-restaurant-selenium?showTestRestaurants

class LandingPage {

   restaurantName() {
      return cy.get("[data-qa='restaurant-header-text']")
   }

   inputLocation() {
      return cy.get("[data-qa='header-location']")
   }

   inputAddress() {
      return cy.get("[data-qa*='input-address-element']")
   }

   selectLocation() {
      return cy.get("[data-qa='location-panel-results-item']").click()
   }

   cartItems() {
      return cy.get("[data-qa='cart-item']")
   }

   clickCommentBtnFirst() {
      return cy.get("[data-qa*='add-comment']").first().click()
   }

   addComment() {
      return cy.get("[data-qa='cart-item-comment-textarea']")
   }

   clickAddComment() {
      return cy.get("[data-qa*='comment-action-add']").click()
   }

   userComment() {
      return cy.get("[data-qa='cart-item-comment-text'] i")
   }

   clickCheckout() {
      return cy.get("[data-qa*='checkout']").click()
   }
   
}

export default LandingPage;
