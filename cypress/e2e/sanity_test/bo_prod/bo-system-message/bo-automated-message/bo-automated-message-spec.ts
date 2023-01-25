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
  cy.contains(`.ant-col ul li:nth-child(24)`, 'System Message')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(2)`)
    .should('contain.text', tab)
    .click({ force: true });
});

Then(`{string} must be shown and can be clicked`, (tab: string) => {
  cy.get(`.ant-tabs-nav-list > .ant-tabs-tab > .ant-tabs-tab-btn`).should(
    `contain.text`,
    tab,
  );
  cy.contains(
    `.ant-tabs-nav-list > .ant-tabs-tab > .ant-tabs-tab-btn`,
    tab,
  ).click();
});
