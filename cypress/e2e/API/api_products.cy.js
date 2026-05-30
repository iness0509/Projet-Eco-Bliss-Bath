describe("Vérifier la fiche du produit", () => {

  const apiUrl = Cypress.env("apiUrl");
  const id = 6;

  it("doit retourner la fiche d’un produit", () => {

    cy.request({
      method: "GET",
      url: `${apiUrl}/products/${id}`
    }).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body.id).to.eq(id);

      expect(response.body.name).to.be.a("string");

      expect(response.body.availableStock).to.be.a("number");

      expect(response.body.skin).to.be.a("string");

      expect(response.body.aromas).to.be.a("string");

      expect(response.body.ingredients).to.be.a("string");

      expect(response.body.description).to.be.a("string");

      expect(response.body.price).to.be.a("number");

      expect(response.body.picture).to.be.a("string");

      expect(response.body.varieties).to.be.a("number");

    });

  });

});