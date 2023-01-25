/// <reference types="cypress" />
import { Then } from '@badeball/cypress-cucumber-preprocessor';

const today = new Date().toLocaleDateString('en-us', {
  day: '2-digit',
  month: 'short',
});
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

//Scenario: Web time and date is show in the header
Then(`time exist in the header`, () => {
  cy.get(`[role="list"] [id="timezone--list"]`).should(`exist`);
});

// Scenario: Interactive time
Then(`date exist in the header`, () => {
  cy.contains(today).should(`exist`);
});
