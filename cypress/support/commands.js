//const cypress = require("cypress")

Cypress.Commands.add('camposmandatorioseenviar',function() {
    cy.get('#firstName').type('Daniel')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('daniel.souza@accenture.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
    
})

Cypress.Commands.add('clicarbotaoenviar',function() {
    cy.contains('button','Enviar').click()

})

Cypress.Commands.add('insereusuariosenha',function() {
    cy.get('#cliente_usuario').type('207750154')
    cy.get('#cliente_senha').type('4976')

})