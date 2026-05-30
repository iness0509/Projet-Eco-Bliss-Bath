describe('Tests gestion du panier', () => {

    beforeEach(() => {
        cy.userlogin()
        cy.ensureCartIsEmpty()
        cy.visit('http://localhost:4200/#/products')
    })

    afterEach(() => {
        cy.ensureCartIsEmpty()
    })


    it("Ajout d'un produit disponible en stock >1 et vérification de la mise à jour du stock", () => {
        cy.getBySel('product-link').eq(7).click()

        cy.getBySel('detail-product-stock').should('be.visible').invoke('text').should('match', /\d+\s+en stock/).then((beforeText) => {
            const beforeStock = parseInt(beforeText.match(/\d+/)[0], 10)

            expect(beforeStock).to.be.greaterThan(1)

            cy.getBySel('detail-product-add').should('be.visible').and('be.enabled').click()

            cy.getBySel('cart-line').should('exist')

            cy.getBySel('cart-line-quantity').should('exist').invoke('val').then((value) => {
                const quantity = parseInt(value, 10)

                expect(quantity).to.be.greaterThan(0)

                cy.go('back')

                cy.getBySel('detail-product-stock').should('be.visible').invoke('text').should('match', /\d+\s+en stock/).then((afterText) => {
                    const afterStock = parseInt(afterText.match(/\d+/)[0], 10)

                    expect(afterStock).to.equal(beforeStock - quantity)
                   

                })
            })
        })
    })



    it("Ajout d'une quantité négative", () => {
        cy.getBySel('product-link').eq(7).click()

        cy.getBySel('detail-product-quantity')
            .should('exist')
            .and('be.visible')
            .clear()
            .type('-1')
            .should('have.value', '-1')

        cy.getBySel('detail-product-form')
            .should('have.class', 'ng-invalid')


    })

    it("Ajout d'une quantité supérieur à 20", () => {
        cy.getBySel('product-link').eq(6).click()

        cy.getBySel('detail-product-quantity')
            .should('exist')
            .and('be.visible')
            .clear()
            .type('21')
            .should('have.value', '21')

        cy.getBySel('detail-product-form')
            .should('have.class', 'ng-invalid')

    })


    it("ajout d'un produit au panier et vérification du contenu via l’API", () => {

        const apiUrl = Cypress.env('apiUrl')

        cy.visit('http://localhost:4200/#/products/6');

        // ajout produit via UI
        cy.getBySel('detail-product-quantity')
            .clear()
            .type('1');

        cy.getBySel('detail-product-add')
            .click();

        cy.window().then((win) => {
            const token = win.localStorage.getItem('user')

            expect(token).to.exist
            expect(token).to.not.equal('undefined')


            // vérification panier via API
            cy.request({
                method: 'GET',
                url: `${apiUrl}/orders`,
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            }).then((response) => {

                expect(response.status).to.eq(200);

                const line = response.body.orderLines.find((item) => item.product.id === 6)

                expect(line).to.exist
                expect(line.quantity).to.eq(1)

                
            })
        })
    })
})











