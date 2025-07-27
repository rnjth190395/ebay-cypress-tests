describe('My First Test Suite',()=>{

it('My First Test Case ',()=>{

cy.visit('https://www.amazon.in/')
cy.get('#twotabsearchtextbox').type('iphone')
//cy.get('#twotabsearchtextbox').type('iphone').type('{enter}')
//cy.get('#nav-search-submit-button').click()
cy.get('.nav-input.nav-progressive-attribute').eq(1).click()
 cy.get('[name="submit.addToCart"]').first().click()




})

})