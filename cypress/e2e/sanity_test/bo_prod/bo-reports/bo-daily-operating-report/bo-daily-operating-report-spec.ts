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
  cy.get(`.date-ranges`, { timeout: 70000 }).should(`exist`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.contains(`.ant-col ul li:nth-child(20)`, 'Reports')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(1)`)
    .should('contain.text', tab)
    .click({ force: true });
});

// For the Select Timezone
When(`admin click {string}`, (btn: string) => {
  cy.contains(`.d-flex > div > button >span`, btn).click();
});
//For the Select Timezone Modal
Then(`the {string} modal will show`, (modal: string) => {
  cy.get(`.ant-modal-header > div.ant-modal-title`).should(
    'contain.text',
    modal,
  );
  //cy.get('.ant-modal-footer > :nth-child(1) > span').click();
});

// Scenario: When download csv button is click
When(`csv button is click`, () => {
  cy.get(`.justify-content-flex-end > .mr-1 > svg`).click();
});
//For the Download modal
Then(`modal will show`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
});

//Scenario: When Refresh button is click
Then(`table display will reload`, () => {
  cy.get('.mr-2 > svg > .b').click({ force: true });
});

//Scenario: When Save Search is click
Then(`Save Search modal will display`, () => {
  cy.get('.p-3 > .justify-content-space-between > div > :nth-child(1)').click({
    force: true,
  });
});
