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
  cy.contains(`.ant-col ul li:nth-child(6)`, tab).click().trigger('mouseover');
});

Then(
  `{string} must also be shown and contains {string}`,
  (tab: string, menuitem: string) => {
    cy.wait(1000);
    cy.contains(`div[title='Member Reports']`, tab, {
      timeout: 30000,
    })
      .click()
      .trigger('mouseover');
    cy.get(`ul[id='member-reports$Menu'] > li`).should(
      `contain.text`,
      menuitem,
    );
  },
);
