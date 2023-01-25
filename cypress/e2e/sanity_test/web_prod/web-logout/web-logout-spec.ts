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
    .its(`response.statusCode`, { timeout: 50000 })
    .should(`eq`, 200);
});

//  Scenario: Member Logout exist account at profile settings
When(`member clicks username at the header`, () => {
  cy.findByText(Cypress.env(`prodSiteUsername`), { selector: `p` })
    .should(`exist`)
    .click();
});

Then(`{string} should exist at users personnal options`, (ctaName: string) => {
  cy.findByRole(`button`, { name: ctaName }).should(`exist`);
});

//  Scenario: Member Logout
When(`clicks {string}`, (ctaName: string) => {
  cy.findByText(`Personal Information`)
    .should('exist')
    .then(() => {
      //cy.wait(1000);
      cy.findByRole(`button`, { name: ctaName })
        .should(`exist`)
        .click({ force: true });
    });
});

Then(`a confirmation message {string} should exist`, (message: string) => {
  cy.findByRole(`alert`).should(`exist`);
  cy.findByText(message).should(`exist`);
});

Then(
  `{string} and {string} button should exist`,
  (join: string, login: string) => {
    cy.findByText(join).should(`exist`);
    cy.findByText(login).should(`exist`);
  },
);

Then(`{string} windows exist`, (logoutWindow: string) => {
  cy.findByText(logoutWindow).should(`exist`);
});
