describe('Smoke tests', () => {
    it('présence des champs et boutons de connexion', () => {
        cy.visit('/login')
        cy.getBySel('login-form').should('be.visible')
        cy.getBySel('login-input-username').should('be.visible')
        cy.getBySel('login-input-password').should('be.visible')
        cy.getBySel('login-submit').should('be.visible')
    })


    it("doit afficher les boutons d’ajout au panier quand l'utilisateur est connecté", () => {
        cy.userlogin()
        cy.getBySel("nav-link-products").click()
        cy.getBySel("product-link").first().click()
        cy.getBySel("detail-product-add").should("be.visible")
        cy.getBySel("detail-product-stock").should("be.visible")

    })
})
