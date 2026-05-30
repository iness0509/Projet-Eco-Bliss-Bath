describe("Test de connexion", () => {
    it("Se connecter avec des identifiants corrects", () => {
        cy.visit("http://localhost:4200/#/");
        cy.getBySel("nav-link-login").click();
        cy.getBySel("login-input-username").type("test2@test.fr");
        cy.getBySel("login-input-password").type("testtest");
        cy.getBySel("login-submit").click();
        cy.getBySel("nav-link-cart").should("be.visible")
        cy.getBySel("nav-link-logout").should("be.visible")
    });

    it("Se connecter avec identifiants incorrects", () => {
        cy.visit("http://localhost:4200/#/");
        cy.getBySel("nav-link-login").click();
        cy.getBySel("login-input-username").type("wrong@test.fr");
        cy.getBySel("login-input-password").type("wrongtest");
        cy.getBySel("login-submit").click();
        cy.getBySel("nav-link-cart").should("not.exist")
         cy.getBySel("nav-link-logout").should("not.exist")
        cy.getBySel("login-errors").should('be.visible')
        
    })
})