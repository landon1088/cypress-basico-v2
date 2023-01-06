Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Carlos')
    cy.get('#email').type('luis.ferreira@gmail.com')
    cy.get('#open-text-area').type('  Lorem ipsum dolor  sit amet, consectetur adipiscing elit. Integer lorem mauris, ultrices ne')
    cy.contains('button','Enviar').click()
})