// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getBySel', (selector) => {
  return cy.get(`[data-cy="${selector}"]`)
})

Cypress.Commands.add('userlogin', () => {
  cy.visit('http://localhost:4200/#/login')
  cy.getBySel('login-input-username').type('test2@test.fr')
  cy.getBySel('login-input-password').type('testtest')
  cy.getBySel('login-submit').click()
  cy.getBySel("nav-link-cart").should('be.visible')
})


Cypress.Commands.add("ensureCartIsEmpty", () => {
  return cy.window().then((win) => {
    const token = win.localStorage.getItem("user")

    expect(token).to.exist

    return cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      const orderLines = res.body.orderLines || []

      if (orderLines.length === 0) {
        return
      }

      return cy.wrap(orderLines).each((line) => {
        return cy.request({
          method: "DELETE",
          url: `http://localhost:8081/orders/${line.id}/delete`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      })
    })
  })
})


