/// <reference types="cypress" />
import { Then, Given } from '@badeball/cypress-cucumber-preprocessor';
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
  cy.contains(`.ant-col ul li:nth-child(6)`, 'Members')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:last`)
    .should('contain.text', tab)
    .click({ force: true });
});

Then(`{string} should be seen on the page`, (txt: string) => {
  cy.contains(`h3`, txt).should('be.visible');
});

Then(`{string} button is present`, (btn: string) => {
  cy.contains(`button > span`, btn).should('be.visible');
});

Then(`toggle switch brand is also there`, () => {
  cy.get(`.ant-switch`).should('be.visible');
});
