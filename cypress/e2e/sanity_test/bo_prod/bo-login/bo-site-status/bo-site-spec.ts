/// <reference types="cypress" />
import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then(`status code should be {int}`, (statusCode: number) => {
  cy.request(`https://admin.nexiux.io/`).then((response) => {
    expect(response.status).to.equal(statusCode);
    cy.wrap(response)
      .its(`body`)
      .should('include', '<title>')
      .and('include', '</html>');
  });
});
