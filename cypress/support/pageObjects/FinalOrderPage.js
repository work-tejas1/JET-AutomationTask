//  https://www.pyszne.pl/en/menu/test-restaurant-selenium?showTestRestaurants=true#checkout

class FinalOrderPage {

   restaurantTitle() {
      return cy.get("[class*='top-title']")
   }

}

export default FinalOrderPage;
