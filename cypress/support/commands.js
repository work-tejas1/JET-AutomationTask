Cypress.Commands.add('selectProduct', productname => {
    cy.get(".prdocutname").each(($el, index, $list) => {
        if ($el.text() === productname) {
            cy.wrap($el).click()
            cy.url().should("contain", "product_id")
        }
    })
});


Cypress.Commands.add('addProductToBasket', productName => {
    cy.get("[data-qa='flex'] h3").each(($el, index, $list) => {
        if ($el.text() === productName) {
            //cy.log($el.text())
            cy.get("[data-qa='item-element']").eq(index).click()
            cy.get("[data-qa*='action-submit']").click()
        }
    })
});




