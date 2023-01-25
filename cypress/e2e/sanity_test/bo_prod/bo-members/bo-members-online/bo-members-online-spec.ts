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
  cy.contains(`.ant-col ul li:nth-child(6)`, 'Members')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(4)`)
    .should('contain.text', tab)
    .click({ force: true });
});

// Scenario Outline: Verify can see different tabs under Members online
Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`, {
    timeout: 20000,
  }).should(`contain.text`, tab);
});

// Scenario Outline: Search row must be shown on the left side
Then(
  `{string} must be shown on the left side below quick filter`,
  (search: string) => {
    cy.get(`div.d-flex.justify-content-between > div > span`, {
      timeout: 20000,
    }).should('contain.text', search);
  },
);

Then(`{string} must be shown on the left side`, (label: string) => {
  cy.get(`.quick-filter-container > div.font-weight-bold`).should(
    'contain.text',
    label,
  );
});
