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

//  Scenario: Member navigate to Withdrawal
When(`member click Withdrawal at the profile option`, () => {
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Transactions`)
    .siblings(`div`)
    .children(`div:nth-child(3)`)
    .click();
});

Then(`Withdrawal modal is shown`, () => {
  cy.get(`.chakra-modal__body [placeholder="Amount"]`).should(`exist`);
});

// Scenario: Member balance are shown at withdrawal modal header
Given(`browser is at member withdrawal modal`, () => {
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });

  cy.contains(`Transactions`)
    .siblings(`div`)
    .children(`div:nth-child(3)`)
    .click();
});

Then(`member balance exist at the withdrawal modal`, () => {
  cy.get(`.chakra-modal__body >div>div:nth-child(2) >div:first`).should(
    (element) => {
      const balance = element.get(0).innerText.split(' ');
      expect(parseFloat(balance[2])).is.to.be.a(`number`);
    },
  );
});

// Scenario: Amount text field exist at withdrawal modal
Then(`amount text box exist and enabled`, () => {
  cy.get(`[placeholder="Amount"]`).should(`exist`);
});

// Scenario: Hexopay credit card exist at withdrawal modal
Then(`hexopay card exist`, () => {
  cy.get(`[name="hexoPayCreditCard"]`)
    .parent(`div`)
    .find(`button`)
    .should(`exist`);
});

// Scenario: Hexopay credit card exist at withdrawal modal
Then(`Withdraw button exist and is disabled`, () => {
  cy.get(`.chakra-modal__body > div form > button`)
    .should(`exist`)
    .should(`be.disabled`);
});
