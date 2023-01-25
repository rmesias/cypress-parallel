/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
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

When(`admin click the {string} tab`, (tab: string) => {
  cy.contains(`.ant-col ul li:nth-child(10)`, tab).click().trigger('mouseover');
});

Then(`admin can see the {string}`, (menuitem: string) => {
  cy.get('.ant-menu-vertical li.ant-menu-item', { timeout: 1000 }).should(
    `contain.text`,
    menuitem,
  );
});
