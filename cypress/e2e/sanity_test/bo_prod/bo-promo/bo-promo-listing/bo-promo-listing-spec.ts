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
  cy.contains(`.ant-col ul li:nth-child(14)`, 'Promo')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(1)`)
    .should('contain.text', tab)
    .click({ force: true });
});

Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`.ant-typography > strong`).should(`contain.text`, tab);
});

When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

Then(`{string} modal will show`, (modal: string) => {
  cy.get(`.ant-modal-title`).should('contain.text', modal).should('be.visible');
});

Then(`{string} will show`, (ticket: string) => {
  cy.get(`.ant-typography.mb-0`).should(`contain.text`, ticket);
});
