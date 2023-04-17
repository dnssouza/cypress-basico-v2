/// <reference types="Cypress" />

describe('Teste Pessoal', function() {
    it.only('verifica o título da aplicação', function() {
        cy.visit('https://extranet.bap.com.br/')
        cy.title().should('be.equal','BAP Extranet')
    })
    it('Insere usuário e senha',function() {
        cy.visit('https://extranet.bap.com.br')
//        cy.get('#cliente_usuario').type('207750154').should('have.value','207750154')
//        cy.get('#cliente_senha').type('4976')
        //cy.contains('Autenticar').click()
        cy.insereusuariosenha()
        cy.get('input[type="submit"]').click()

        cy.contains('BIANCA FERREIRA PAPOULA').should('be.visible')

//        cy.get('a[href="https://extranet.bap.com.br/ad/?desautenticar=1"]').click()
        cy.get('a[href="https://extranet.bap.com.br/ad/quitacao.php"]')
            .last()
            .invoke('removeAttr','target')
            .click()
    })
  })