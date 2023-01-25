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

//  Scenario: Deposit button exist at the header
Then(`{string} button exist at the page header`, (btnName: string) => {
  cy.contains(`[type="button"]`, btnName).should(`exist`);
});

//Scenario: Member clicks Deposit button
When(`member clicks {string} button`, (btnName: string) => {
  cy.contains(`[type="button"]`, btnName).click();
});

Then(`Deposit modal show up`, () => {
  cy.get(`.chakra-modal__body .custom-scroll`).should(`exist`);
  cy.get(`[placeholder="Amount"]`).should(`exist`);
  cy.get(`form >.chakra-tabs button`).should(`exist`);
  cy.get(`.chakra-modal__body .custom-scroll [type="submit"]`).should(`exist`);
});
