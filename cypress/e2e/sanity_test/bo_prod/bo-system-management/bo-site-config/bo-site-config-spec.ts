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
  cy.intercept(`POST`, `/graphql?getSiteConfiguration`).as(`tableDataLoad`);
  cy.contains(`.ant-col ul li:nth-child(22)`, 'System Management')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(1)`)
    .should('contain.text', tab)
    .click({ force: true });
  cy.wait(`@tableDataLoad`).its(`response.statusCode`).should(`eq`, 200);
});

Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
    `contain.text`,
    tab,
  );
});

When(`left side button is click`, () => {
  cy.get(`.ant-btn.ant-btn-sm.mr-3`).click();
});

Then(`{string} must be shown on the left side`, (search: string) => {
  cy.get(`.font-weight-bold`).should('contain.text', search);
});

// Scenario: When New Domain is click
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click({ force: true });
});

Then(`{string} will show`, (modal: string) => {
  cy.get(`.modal-title`).should('contain.text', modal).should('be.visible');
});

// Scenario: When Edit button is click
When(`{string} button is click`, (btn: string) => {
  cy.contains(`button > span`, btn).click();
});

Then(`the {string} modal will show`, (modal: string) => {
  cy.get(`.ant-modal-title`).should('contain.text', modal).should('be.visible');
});
