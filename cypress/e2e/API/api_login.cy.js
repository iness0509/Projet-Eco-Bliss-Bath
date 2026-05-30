describe('API Login', () => {
    const apiUrl = Cypress.env('apiUrl')

    it('connexion réussie avec des identifiants valides', () => {

        cy.request({
            method: 'POST',
            url: `${apiUrl}/login`,
            body: {
                username: 'test2@test.fr',
                password: 'testtest'
            }
        }).then((response) => {

            expect(response.status).to.eq(200)

            expect(response.body).to.have.property('token')

        })

    })

    it('échec de connexion avec des identifiants invalides', () => {

        cy.request({
            method: 'POST',
            url: `${apiUrl}/login`,
            failOnStatusCode: false,

            body: {
                username: 'wrong@test.fr',
                password: 'test'
            }

        }).then((response) => {

            expect(response.status).to.eq(401)

            expect(response.body.message).to.eq('Invalid credentials.')

        })

    })

})

