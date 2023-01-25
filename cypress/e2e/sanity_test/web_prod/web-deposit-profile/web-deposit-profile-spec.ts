/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

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

// Scenario: Member navigate to Deposit from Profile options
When(`member click Deposit at the profile option`, () => {
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Transactions`)
    .siblings(`div`)
    .children(`div:nth-child(2)`)
    .click();
});

Then(`Deposit modal is shown`, () => {
  cy.get(`.chakra-modal__body .custom-scroll`).should(`exist`);
});

// Scenario: Member balance are shown at Deposit modal header
Given(`browser is at member Deposit modal`, () => {
  cy.get(`[aria-label="Profile Options"]`).should('exist');
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Transactions`)
    .siblings(`div`)
    .children(`div:nth-child(2)`)
    .click();
});

Then(`member balance exist at the Deposit modal header`, () => {
  cy.contains(`Debit Card`)
    .siblings(`div`)
    .should((element) => {
      const balance = element.get(0).innerText.split(' ');
      balance[1] = balance[1].slice(1);
      expect(parseFloat(balance[1])).is.to.be.a(`number`);
    });
});

// Scenario: Amount text field exist at Deposit modal
Then(`amount text box exist and enabled`, () => {
  cy.get(`[placeholder="Amount"]`).should(`exist`);
});

// Scenario: Hexopay credit card exist at Deposit modal
Then(`hexopay card exist`, () => {
  cy.get(`form >.chakra-tabs button`).should(`exist`);
});

// Scenario: Deposit button
Then(`Deposit button exist`, () => {
  cy.get(`.chakra-modal__body .custom-scroll [type="submit"]`).should(`exist`);
});
