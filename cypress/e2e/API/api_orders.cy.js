describe('API orders sans connexion', () => {
    const apiUrl = Cypress.env('apiUrl')

    it('Accès au panier sans être connecté', () => {

        cy.request({
            method: 'GET',
            url: `${apiUrl}/orders`,
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.eq(403)

        })

    })

})

describe('Api orders connecté ', () => {
    const apiUrl = Cypress.env('apiUrl')
    let token

    before(() => {

        cy.request({
            method: 'POST',
            url: `${apiUrl}/login`,
            body: {
                username: 'test2@test.fr',
                password: 'testtest'
            }

        }).then((response) => {

            expect(response.status).to.eq(200)
            token = response.body.token

        })

    })

    it('accés au contenu du panier', () => {

        cy.request({
            method: 'GET',
            url: `${apiUrl}/orders`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {

            expect(response.status).to.eq(200)
            expect(response.body.orderLines).to.be.an('array') 
        })

    })

    it('ajouter un produit disponible au panier avec la méthode POST', () => {

        cy.request({
            method: 'POST', 
            url: `${apiUrl}/orders/add`,
            headers: {
                Authorization: `Bearer ${token}`
            },

            body: {
                product: 5,
                quantity: 1
            }

        }).then((response) => {

            expect(response.status).to.eq(200)

        })

    })

    it('ajouter un produit disponible au panier', () => {

        cy.request({
            method: 'PUT', // normalement c'est un POST mais PUT est là pour vérifié le comportement actuel de l'api
            url: `${apiUrl}/orders/add`,
            headers: {
                Authorization: `Bearer ${token}`
            },

            body: {
                product: 5,
                quantity: 1
            }

        }).then((response) => {

            expect(response.status).to.eq(200)

        })

    })

    it('ajouter un produit en rupture de stock', () => {

        cy.request({
            method: 'PUT',  // normalement c'est un POST mais PUT est là pour vérifié le comportement actuel de l'api
            url: `${apiUrl}/orders/add`,
            failOnStatusCode: false,

            headers: {
                Authorization: `Bearer ${token}`
            },

            body: {
                product: 4,
                quantity: 1
            }

        }).then((response) => {

            expect(response.status).to.eq(409)  

        })

    })
 }) 