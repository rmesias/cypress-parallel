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
  cy.get(`.ant-menu-vertical li:nth-child(5)`)
    .should('contain.text', tab)
    .click({ force: true });
});

// Scenario Outline: Verify can see different tabs under profile setting
Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`div.row > div.col`).should(`contain.text`, tab);
});

// Scenario Outline: Prifile setting consists of ..
Then(`the profile settings must consists of {string}`, (list: string) => {
  cy.get(`div.ant-radio-group.ant-radio-group-outline > div.col`).should(
    `contain.text`,
    list,
  );
});
