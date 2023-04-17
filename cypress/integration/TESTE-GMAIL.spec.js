describe('Teste GMAIL', function() {
    it('Acessa a página', function() {
        cy.visit('https://google.com')
        //cy.title().should('be.equal','Gmail')
        cy.get('[class=gb_Rd]').click()
    })
    it.only('Insere usuario',function() {
        cy.visit('https://www.gmail.com')
        cy.get('#identifierId').type('dnssouza@gmail.com').should('have.value','dnssouza@gmail.com')
        //cy.get('#identifierNext').click()
        //cy.get('button[type="submit"]')
        //cy.get('[data-layer="Content"]')
    })
    it('Clicar no fazer login',function() {
        cy.visit('https://google.com')
        //cy.get('a[href="https://accounts.google.com/ServiceLogin?hl=pt-BR&passive=true&continue=https://www.google.com/&ec=GAZAmgQ"]')
        //cy.contains('Fazer login').click()
        //cy.get('button:contains(Next)')
        cy.get('a:contains(Fazer login)').click()
    })
    it('Entrar no hotmail',function() {
        cy.visit('https://outlook.live.com/owa/')
        cy.get('a:contains(Sign in)').first().click()
        //cy.get('a[href="https://outlook.live.com/owa/?nlp=1"]').click()
    })
})
