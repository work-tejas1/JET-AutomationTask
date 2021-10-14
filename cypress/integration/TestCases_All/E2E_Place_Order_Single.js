/// <reference types="cypress" />
//Import all PageObject files
import CheckoutPage from '../../support/pageObjects/CheckoutPage'
import LandingPage from '../../support/pageObjects/LandingPage'
import FinalOrderPage from '../../support/pageObjects/FinalOrderPage'

describe('Place order for Test Selenium restaurant SINGLE', () => {
    //Initiate PageObjects (../../support/pageObjects/*)
    const landingPage = new LandingPage()
    const checkoutPage = new CheckoutPage()
    const finalOrderPage = new FinalOrderPage()

    before(() => {
        //Fetch data from fixtures folder.
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.fixture("testData").then((data) => {
            globalThis.data = data;
        })
    })

    it('Add items to basket', function () {

        /*Visit to TEST URL
        (We can set baseUrl in cypress.json file) and use: cy.visit("/", { failOnStatusCode: false }). 
        For simplicity directly passing URL with custom query parameters.
        */
        cy.visit("https://www.pyszne.pl/en/menu/test-restaurant-selenium?showTestRestaurants", { failOnStatusCode: false })

        //Assert Restaurant Name, Set location and assert location
        landingPage.restaurantName().then(($restaurantName) => {
            const restaurantNameText = $restaurantName.text()
            cy.log(restaurantNameText)
            expect(restaurantNameText).is.eq(globalThis.data.restaurantName)
        })
        landingPage.inputLocation().as("location")
        cy.get("@location").click()
        landingPage.inputAddress().type(globalThis.data.setLocation)
        landingPage.selectLocation()
        cy.wait(4000)
        cy.get("@location").invoke("text").then(($enteredLocation) => {
            expect($enteredLocation).is.eq(globalThis.data.setLocation)
        })

        /*Using custom command(support/commands.js) add 3 meals to basket(from fixtures/testData) 
        then assert number of meals is eqal to 3 then add 'no sugar' comment for first meal. 
        Click on checkout
        */
        globalThis.data.productName.forEach(function (element) {
            cy.addProductToBasket(element)
        })
        landingPage.cartItems().should("have.length", 3)
        landingPage.clickCommentBtnFirst()
        landingPage.addComment().type(globalThis.data.userComment)
        landingPage.clickAddComment()
        cy.wait(700)
        landingPage.userComment().invoke('text').then(($note) => {
            expect($note).is.eq(globalThis.data.userComment)
        })
        landingPage.clickCheckout()

        //Input user details
        checkoutPage.fullNameInput().type(globalThis.data.firstName)
        checkoutPage.emailInput().type(globalThis.data.emailValue)
        checkoutPage.phoneNumberInput().type(globalThis.data.phoneNumber)

        /*Select and assert PAYPAL as payment method. Click on cancel and return.
        Assert API response length and value. (More asserations can be added)
        */
        checkoutPage.clickPaymentElement()
        checkoutPage.clickPaypal()
        checkoutPage.actionBtnDone().as("Done")
        cy.get("@Done").click()
        checkoutPage.paymentMethod().first().invoke('text').then(($paymentProvider) => {
            expect($paymentProvider).is.eq(globalThis.data.paymentProvider)
        })
        checkoutPage.clickSubmit()
        checkoutPage.clickCancelAndReturn()
        checkoutPage.clickPaymentDetails()
        cy.waitUntil(() => cy.getCookies().should('have.length', 24));
        cy.getCookies().then((cookies) => {
            expect(cookies[22]).to.have.property('name', 'pickup')
            expect(cookies[22]).to.have.property('value', 'takeaway')
        })
        //Select and assert CASH as payment method. Assert TOTAL AMOUNT and subit order.
        checkoutPage.clickCash()
        cy.get("@Done").click()
        checkoutPage.paymentMethod().last().invoke('text').then(($cashPayment) => {
            expect($cashPayment).contains(globalThis.data.finalPaymentMethod)
        })
        checkoutPage.submitOrder().within(($sumbit) => {
            checkoutPage.orderTotalText().invoke('text').then(($finalTotal) => {
                expect($finalTotal).contains(globalThis.data.totalAmount)
            })
        })
        checkoutPage.submitOrder().click()

        //Assert: URL contain trackingid and order is placed from correct Restaurant.
        cy.url().should("contain", "trackingid")
        finalOrderPage.restaurantTitle().invoke('text').then(($finalOrderRestaurant) => {
            expect($finalOrderRestaurant).contains(globalThis.data.restaurantName)
        })
    })

})
