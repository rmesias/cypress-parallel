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
  cy.contains(`.ant-col ul li:nth-child(22)`, 'System Management')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(5)`)
    .should('contain.text', tab)
    .click({ force: true });
});

// Scenario: Verify Geo fencing tab is shown
Then(`{string} tab is shown`, (tab: string) => {
  cy.get(`h3`).should(`contain.text`, tab).should(`be.visible`);
});

// Scenario: When Edit button is click
When(`{string} button is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

Then(`{string} modal will show`, (modal: string) => {
  cy.get(`.ant-drawer-title`)
    .should('contain.text', modal)
    .should('be.visible');
});

// Scenario: Add more button is clickable
Then(`Geo location form will be added`, () => {
  cy.get(`form#geoloc-form > div.d-flex`).eq(1).should(`be.visible`);
});
