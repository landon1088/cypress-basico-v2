/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    cy.visit("./src/index.html")
    })
  it('verifica o título da aplicação', function() {
    cy.title()
      .should('be.equal','Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', function(){
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Carlos')
    cy.get('#email').type('luis.ferreira@gmail.com')
    cy.get('#open-text-area').type('  Lorem ipsum dolor  sit amet, consectetur adipiscing elit. Integer lorem mauris, ultrices ne') , {delay:0}
    cy.contains('button','Enviar').click()
    cy.get('.success')
        .should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Carlos')
    cy.get('#email').type('luis.ferreira@cazco.digital')
    cy.get('#open-text-area').type('  Lorem ipsum dolor  sit amet, consectetur adipiscing elit. Integer lorem mauris, ultrices ne') , {delay:0}
    cy.contains('button','Enviar').click()
    cy.get('.error')
      .should('be.visible')
  })
  it('verificar não númerico',function(){
    cy.get('#phone')
    .type('sdadsfasfasd')
    .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Carlos')
    cy.get('#email').type('luis.ferreira@cazco.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('  Lorem ipsum dolor  sit amet, consectetur adipiscing elit. Integer lorem mauris, ultrices ne') , {delay:0}
    cy.contains('button','Enviar').click()
    
    cy.get('.error')
      .should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
    cy.get('#firstName').type('João')
      .should('have.value','João')
      .clear()
      .should('have.value','')
    cy.get('#lastName').type('Carlos')
      .should('have.value','Carlos')
      .clear()
      .should('have.value','')
    cy.get('#email').type('luis.ferreira@cazco.com')
      .should('have.value','luis.ferreira@cazco.com')
      .clear()
      .should('have.value','')
    cy.get('#phone').type('1234566')
      .should('have.value','1234566')
      .clear()
      .should('have.value','')
    cy.get('#open-text-area')
      .type('Lorem ipsum')
      .should('have.value','Lorem ipsum')
      .clear()
      .should('have.value','')
  })
  it('Verificação de erro ao não preencher campos obrigatórios',function(){
    cy.contains('button','Enviar').click()
    cy.get('.error')
      .should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success')
      .should('be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product').select('youtube')
      .should('have.value','youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product').select('mentoria')
    .should('have.value','mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product').select(1)
    .should('have.value','blog')
  })
  it('marca o tipo de atendimento "Feedback', function(){
  cy.get('input[type="radio"][value="feedback"]').check()
  })
  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"][value="ajuda"]').check()
      .should('be.checked')
    cy.get('input[type="radio"][value="elogio"]').check()
      .should('be.checked')
    cy.get('input[type="radio"][value="feedback"]').check()
      .should('be.checked')
  })
  it('marca ambos checkboxes, depois desmarca o último',function(){
    cy.get('#check input[type="checkbox"')
      .as('checkboxes')
      .check()
      .last()
      .uncheck()
  })
  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example').as('sampleFile')
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('@sampleFile')
    .should(function($input){
      console.log($input)
      expect($input[0].files[0].name).to.equal('example')
    })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target')
      .click()
    cy.url()
      .should('be.equal', 'http://localhost:39477/src/privacy.html')
  })
})