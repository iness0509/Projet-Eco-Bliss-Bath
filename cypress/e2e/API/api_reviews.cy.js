describe("API Reviews", () => {

    const apiUrl = Cypress.env("apiUrl");

    let token;

    before(() => {

        cy.request({
            method: "POST",
            url: `${apiUrl}/login`,
            body: {
                username: "test2@test.fr",
                password: "testtest"
            }

        }).then((response) => {

            expect(response.status).to.eq(200)
            token = response.body.token;

        });

    });

    it("ajouter un avis", () => {

        cy.request({
            method: "POST",
            url: `${apiUrl}/reviews`,

            headers: {
                Authorization: `Bearer ${token}`
            },

            body: {
                title: "test : Très bon produit",
                comment: "test: Savon agréable à utiliser",
                rating: 5
            }

        }).then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('title');
            expect(response.body).to.have.property('comment');
            expect(response.body).to.have.property('rating');

        });

    });
    it("vérifier une faille XSS dans l’espace commentaire", () => {

        cy.request({
            method: "POST",
            url: `${apiUrl}/reviews`,

            headers: {
                Authorization: `Bearer ${token}`
            },

            failOnStatusCode: false,

            body: {
                title: "Test",
                comment: "<script>alert('XSS');</script>",
                rating: 5
            }

        }).then((response) => {

           expect(response.status).to.be.eq(500);

        })

    })

});