/// <reference types="cypress" />
import { Then } from '@badeball/cypress-cucumber-preprocessor';

let context: Cypress.LoginOutputs;

before(() => {
  cy.siteAuthentication({
    inputs: {
      credentials: Cypress.env(`prodSiteCredentials`),
      site: Cypress.env(`prodAuthURL`),
      code: Cypress.env(`prodAdminCode`),
    },
  }).then((response) => {
    context = response;
    cy.setLocalStorage(`ADMIN_CODE`, Cypress.env(`prodAdminCode`));
    cy.setLocalStorage(`ACCESS_TOKEN`, context.access);
    cy.setLocalStorage(`CURRENT_ENVIRONMENT`, `production`);
    cy.saveLocalStorage();
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.intercept(`POST`, `/graphql?defaultCurrency`).as(`modalStatus`);
  cy.visit(`/`);
  cy.wait(`@modalStatus`)
    .its(`response.statusCode`, { timeout: 20000 })
    .should(`eq`, 200);
});

Then(`member balance exist at the header`, () => {
  // cy.wait('@balanceView').its(`response.statusCode`).should(`eq`, 200);
  cy.contains(`Balance:`)
    .should(`exist`)
    .siblings(`span`)
    .invoke(`prop`, `innerText`)
    .then((balance) => {
      const bal = balance.split(' ');
      expect(parseFloat(bal[1])).is.to.be.a(`number`);
    });
});
