/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

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

// Scenario: Help Centre at the header
Then(`Help Centre exist at the header`, () => {
  cy.contains(`[href="/help-centre"]`, `Help Centre`).should(`exist`);
});

// Scenario: Help Centre at the footer
Then(`Help Centre at the footer`, () => {
  cy.contains(`p`, `Help Centre`).should(`exist`);
});

// Scenario: Navigate to Help Centre from header cta
When(`member clicks Help Centre at the header`, () => {
  cy.contains(`[href="/help-centre"]`, `Help Centre`).click();
});

Then(`member is redirected to Help Centre page`, () => {
  cy.url().should(`eq`, `https://qa.nexiux.io/help-centre`);
  cy.request(`https://qa.nexiux.io/help-centre`).then((response) => {
    expect(response.status).to.equal(200);
  });
});

// Scenario: Navigate to Help Centre from footer cta
When(`member clicks Help Centre at the footer`, () => {
  cy.contains(`p`, `Help Centre`).should('exist').click();
});
