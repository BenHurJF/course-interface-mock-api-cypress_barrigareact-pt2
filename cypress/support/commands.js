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
import loc from './locators';
Cypress.Commands.add('LOGIN', (user, password) => {
    cy.visit('/')
    cy.get(loc.LOGIN.user).type(user)
    cy.get(loc.LOGIN.pass).type(password)
    cy.get(loc.LOGIN.btnLogin).eq(0).click()
    cy.get(loc.LOGIN.MSG, {timeout:22000}).should('text', 'Bem vindo, Usuário falso!')
})

Cypress.Commands.add('ResetApp', () => {
    cy.get(`a[class='nav-link dropdown-toggle']`).click()
    cy.get('[href="/reset"]').click()
    cy.get('.toast-message', {timeout:22000}).should('contain', 'Dados resetados com sucesso!')
})
   