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

// Scenario: Verify admin can click operators tab
When(`admin click the {string} tab`, (tab: string) => {
  cy.contains(`.ant-col ul li:nth-child(4)`, tab)
    .click({ force: true })
    .trigger('mouseover');
});

Then(`admin can see the {string} and {string}`, (am: string, pg: string) => {
  cy.get(`.ant-menu-vertical li`)
    .eq(0)
    .should('contain.text', am)
    .should('be.visible');
  cy.get(`.ant-menu-vertical li`)
    .eq(1)
    .should('contain.text', pg)
    .should('be.visible');
});

// Scenario: Verify can click account management
When(`{string} is click`, (tab: string) => {
  if (tab === 'Account Management') {
    cy.contains(`.ant-col ul li:nth-child(4)`, 'Operators')
      .click()
      .trigger('mouseover');
    cy.get(`.ant-menu-vertical li`).eq(0).click();
  } else if (tab === 'Permission Group') {
    cy.contains(`.ant-col ul li:nth-child(4)`, 'Operators')
      .click()
      .trigger('mouseover');
    cy.get(`.ant-menu-vertical li`).eq(1).click();
  }
});

Then(`the {string} block will be shown`, (tab: string) => {
  cy.get(`.d-inline-block`).should('contain.text', tab);
});
