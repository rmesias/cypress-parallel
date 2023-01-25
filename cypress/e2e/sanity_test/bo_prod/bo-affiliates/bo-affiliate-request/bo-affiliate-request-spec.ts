/// <reference types="cypress" />
import { Then, Given, When } from '@badeball/cypress-cucumber-preprocessor';
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
  cy.intercept(`POST`, `/graphql?affiliateRequests`).as(`refresh`);
  cy.contains(`.ant-col ul li:nth-child(8)`, 'Affiliates')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:last`)
    .should('contain.text', tab)
    .click({ force: true });
  cy.wait(`@refresh`).its(`response.statusCode`).should(`eq`, 200);
});

//  Scenario Outline: Verify can see different tabs under Affiliate Request
Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
    `contain.text`,
    tab,
  );
});

// Scenario Outline: Search row must be shown on the left side
Then(`{string} must be shown on the left side`, (search: string) => {
  cy.get(`span.font-weight-bold`).should('contain.text', search);
});

Then(`Quick Filter must be shown on the left side`, () => {
  cy.get(`.quick-filter-container > div.font-weight-bold`).should(
    'contain.text',
    'Quick Filter',
  );
});

// Scenario: Verify admin can click refresh icon
When(`admin clicks refresh icon`, () => {
  cy.get(`.d-flex`).should('be.visible');
  cy.get(`.anticon.mr-2`).eq(0).click();
});

Then(`table should be refreshed`, () => {
  cy.wait(`@refresh`).its(`response.statusCode`).should(`eq`, 200);
});

// Scenario: Verify admin can click custom columns icon
When(`admin clicks Custom Columns icon`, () => {
  cy.get(`.d-flex`).should('be.visible');
  cy.get(`#columns-filter-button-affiliate-request`).click();
});

Then(`admin should see the draggable Custom Columns dropdown options`, () => {
  cy.get(`div.ant-popover-content`).should('be.visible');
  cy.contains(`.ant-popover-title > div`, 'Custom Columns').should(
    'be.visible',
  );
});

// Scenario: Verify admin can click download csv icon
When(`admin clicks download csv icon`, () => {
  cy.get(`div.mr-1 > span.anticon.mr-1`, { timeout: 1000 }).click();
});

Then(`download csv modal will show`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
});

// Scenario: Verify admin can click more actions button
When(`admin clicks more actions icon`, () => {
  cy.get(`button.ant-btn.ant-dropdown-trigger.mr-2`, { timeout: 1000 }).click();
});

Then(`admin should see more actions dropdown options`, () => {
  cy.get(`ul.ant-dropdown-menu`).should('be.visible');
});

// Scenario: Verify admin can click save search button
When(`admin clicks save search button`, () => {
  cy.get(`div.mb-3 > div > a`, { timeout: 1000 }).eq(0).click();
});

Then(`admin should see save search modal`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Save Search');
});

// Scenario: Verify admin can click search settings icon
When(`admin clicks search settings icon`, () => {
  cy.get(`div.mb-3 > div > a`, { timeout: 1000 }).eq(1).click();
});

Then(`admin should see search settings icon`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Search Settings');
});
