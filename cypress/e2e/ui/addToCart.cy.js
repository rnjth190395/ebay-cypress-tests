//const { Runnable } = require("mocha");
require('cypress-xpath');
Cypress.on('uncaught:exception', () => false);


describe('Ebay - Add to Cart UI Test', () => {

  before(() => {
    cy.visit('/');
  });

  it('should search for a book and add the first item to cart', () => {
    cy.get('input[aria-label="Search for anything"]')
      .type('book{enter}');

    //  cy.xpath("(//span[@class='su-styled-text primary default'] | //div[@class='s-item__caption'])[1]", { timeout: 15000 })
    //  // .should('be.visible')
    //   .scrollIntoView()
    //   .then(($span) => {
    //     cy.wrap($span)
    //       .closest('a')
    //       .invoke('removeAttr', 'target')
    //       .click({ force: true });
    //   });

    cy.xpath("//span[@class='su-styled-text primary default'] | //div[@class='s-item__caption']", { timeout: 15000 })
      .each(($el, index, $list) => {
        const $link = Cypress.$($el).closest('a');
        const href = $link.attr('href');

        if (href && href.includes('/itm/')) {
          cy.log(`✅ Found valid product at index ${index}: ${href}`);
          cy.visit(href);
          return false; // break the .each() loop
        }
      })
      .then(() => {
        cy.log('✅ Navigation complete or no valid product found');
      });

    cy.xpath("//span[text()='Add to cart']", { timeout: 15000 })
      //.should('be.visible')
      .click();



    cy.xpath("//span[text()='Added to cart']", { timeout: 15000 })
      .should('contain.text', 'Added to cart');

    cy.xpath("//button[@aria-label='Close overlay']").click();

    cy.xpath("//span[@class='gh-cart__icon']", { timeout: 15000 })
      .should('not.have.text', '0')

  });
});
