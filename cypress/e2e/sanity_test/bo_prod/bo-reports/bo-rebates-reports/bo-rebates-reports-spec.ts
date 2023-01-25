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
  cy.contains(`.ant-col ul li:nth-child(20)`, 'Reports')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(4)`)
    .should('contain.text', tab)
    .click({ force: true });
});

Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
    `contain.text`,
    tab,
  );
});

Then(`{string} must be shown on the left side`, (search: string) => {
  cy.get(`.font-weight-bold`).should('contain.text', search);
});

// Scenario: Verify request update toggle button is shown
// Then(`{string} text is shown`, (txt: string) => {
//   cy.get(`div > span`).should(`contain.text`, txt);
// });

Then(`toggle button is also shown`, () => {
  cy.get(`.ant-switch-checked`).should('be.visible');
});

// Scenario: When custom column button is click
When(`custom column button is click`, () => {
  cy.wait(5000);
  cy.get(`#columns-filter-button-rebates-reports > .anticon > svg`).click();
});

Then(`{string} will show`, (modal: string) => {
  cy.get(`.ant-popover-title > .d-flex`)
    .should(`contain.text`, modal)
    .should('be.visible');
});

// Scenario: When download csv button is click
When(`csv button is click`, () => {
  cy.get(`.justify-content-flex-end > .mr-1 > svg`).click();
});

Then(`modal will show`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
});
