/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário',function() {
        const TextoLongo = 'Uma vez Flamengo, sempre Flamengo, Flamengo sempre eu hei de ser. É meu maior prazer, ve-lo brilhar, seja na terra, seja no mar. Vencer, Vencer, Vencer'
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('daniel.souza@accenture.com')
        cy.get('#open-text-area').type(TextoLongo,{delay:0})
        //cy.get('button[type="submit"]').click()
        cy.clicarbotaoenviar()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function() {
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('daniel.souza_accenture.com')
        cy.get('#open-text-area').type('Teste')
        //cy.get('button[type="submit"]').click()
        cy.clicarbotaoenviar()

        cy.get('.error').should('be.visible')

    })
    it('teste de validação de campo númerico ficando vazio quando digita valores não numéricos',function() {
        cy.get('#phone')
            .type('Daniel')
            .should('have.value','')

    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function() {
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('daniel.souza@accenture.com')
        cy.get('#open-text-area').type('Teste')
        //cy.get('#phone-checkbox').click()
        cy.get('#phone-checkbox').check()
        //cy.get('button[type="submit"]').click()
        cy.clicarbotaoenviar()

        cy.get('.error').should('be.visible')

    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function() {
        cy.get('#firstName').type('Daniel').should('have.value','Daniel').clear().should('have.value','')
        cy.get('#lastName').type('Souza').should('have.value','Souza').clear().should('have.value','')
        cy.get('#email').type('daniel.souza@accenture.com').should('have.value','daniel.souza@accenture.com').clear().should('have.value','')
        cy.get('#phone').type('81981221270').should('have.value','81981221270').clear().should('have.value','')

    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function() {
        //cy.get('button[type="submit"]').click()
        cy.clicarbotaoenviar()

        cy.get('.error').should('be.visible')

    })
    it('envia o formuário com sucesso usando um comando customizado',function() {
        cy.camposmandatorioseenviar()
        
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto',function() {
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu índice',function() {
        cy.get('#product').select(1).should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback"',function() {
        //Pode usar qualquer uma das linhas abaixo (passando o valor que quer marcar no check ou definir antes):
        //cy.get('input[type="radio"]').check('feedback').should('have.value','feedback')
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })
    it('marca cada tipo de atendimento',function() {
        cy.get('input[type="radio"]').should('have.length',3)
        .each(function($radio) {
            //pode colocar o should logo depois do check (primeira linha) ou criar outra linha do cy.wrap pra marcar o checked (linhas 2 e 3)
            //cy.wrap($radio).check().should('be.checked')
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último',function() {
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
        //cy.get('input[type="checkbox"]').uncheck('phone')

        //cy.get('input[type="checkbox"]')
        //.each(function($checkbox) {
        //    cy.wrap($checkbox).check()
        //    cy.wrap($checkbox).should('be.checked')
        //})
        //cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures',function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop',function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop' })
        //A validação pode ser feita pelo .then ou pelo .should, conforme abaixo
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        //.should(function($input){
        //    expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('arqexemplo')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@arqexemplo')
//        .then(input => {
//            expect(input[0].files[0].name).to.equal('example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        //O cy.get pode ser chamado das 2 formas abaixo. Mais completa (linha 1) ou chama o id #privacy e informa que é um elemento tipo a (ancora) (linha 2)
        cy.get('a[href="privacy.html"]')
//        cy.get('#privacy a')
        .should('have.attr','target','_blank')
        .click()
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        //O cy.get pode ser chamado das 2 formas abaixo. Mais completa (linha 1) ou chama o id #privacy e informa que é um elemento tipo a (ancora) (linha 2)
        //cy.get('a[href="privacy.html"]')
        cy.get('#privacy a')
          .should('have.attr','target','_blank')
          .invoke('removeAttr', 'target')
          .click()
        
          cy.contains('Talking About Testing')
          .should('be.visible')

    })
})