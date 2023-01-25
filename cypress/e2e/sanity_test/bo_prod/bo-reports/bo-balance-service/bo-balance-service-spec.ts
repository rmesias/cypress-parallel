/// <reference types="cypress" />
import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
let context: Cypress.LoginOutputs;

before(() => {
  cy.boAuthentication({
    inputs: {
      credentials: Cypress.env(`boProdCredentials`),
      site: Cypress.env(`prodAuthURL`),
    },
  }).then((response) => {
    context = response;
    cy.setLocalStorage(`BOaccessToken`, context.access);
    cy.setLocalStorage(`accessToken`, context.access);
    cy.setLocalStorage(`BOrefreshToken`, context.refresh);
    cy.saveLocalStorage();
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.visit(`/`);
  cy.get(`.date-ranges`, { timeout: 50000 }).should(`exist`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.contains(`.ant-col ul li:nth-child(20)`, 'Reports')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(5)`)
    .should('contain.text', tab)
    .click({ force: true });
});

// Scenario: Verify Search User can be seen when
Then(`the {string} button can be seen`, (btn: string) => {
  cy.get(`button > span`).should('contain.text', btn).should('be.visible');
});

// Scenario: When user click the search user button
When(`user click the {string} button`, (btn: string) => {
  cy.contains(`button > span`, btn, { timeout: 30000 }).click();
});

Then(`the {string} modal will be seen`, (modal: string) => {
  cy.get(`.ant-modal-header > .ant-modal-title`).should('contain.text', modal);
});

Then(`{string} on the text field`, (txt: string) => {
  cy.get(`.ant-select-selector > span:nth-child(2)`).should(
    'contain.text',
    txt,
  );
});
