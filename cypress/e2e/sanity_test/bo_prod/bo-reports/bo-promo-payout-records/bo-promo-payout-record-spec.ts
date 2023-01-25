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
  cy.get(`.ant-menu-vertical li:nth-child(4)`)
    .should('contain.text', tab)
    .click({ force: true });
});

// Scenario: When download csv button is click
When(`csv button is click`, () => {
  cy.get(`.justify-content-flex-end > .mr-1 > svg`).click();
});
//For the Download modal
Then(`modal will show`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
});

//Refresh icon is click
Then(`Table will be refreshed`, () => {
  cy.get('.justify-content-flex-end > :nth-child(2) > svg').click({
    force: true,
  });
});
