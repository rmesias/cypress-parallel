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
  cy.contains(`.ant-col ul li:nth-child(16)`, tab)
    .click({ force: true })
    .trigger('mouseover');
});

Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
    `contain.text`,
    tab,
  );
});

Then(`Quick Filter must be shown on the left side`, () => {
  cy.get(`.mb-3.quick-filter-container > div`).should(
    'contain.text',
    'Quick Filter',
  );
});

Then(`VIP Programme Name must be shown on the left side`, () => {
  cy.get(`div.d-flex.justify-content-between > div > span`).should(
    'contain.text',
    'VIP Programme Name',
  );
});

Then(`Status must be shown on the left side`, () => {
  cy.get(`div.font-weight-bold`).should('contain.text', 'Status');
});

// Scenario: Verify admin can click save search button
When(`admin clicks save search button`, () => {
  cy.get(`div.d-flex > div > a`, { timeout: 30000 }).eq(0).click();
});

Then(`admin should see save search modal`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Save Search');
});

// Scenario: Verify admin can click search settings icon
When(`admin clicks search settings icon`, () => {
  cy.get(`div.d-flex > div > a`, { timeout: 30000 }).eq(1).click();
});

Then(`admin should see search settings icon`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Search Settings');
});

// Scenario: Verify admin can click refresh icon
When(`admin clicks refresh icon`, () => {
  cy.get(`.d-flex`).should('be.visible');
  cy.intercept(`POST`, `/graphql?memberLoyaltyProgrammes`).as(`refresh`);
  cy.get(`.anticon.mr-2`).eq(0).click();
  cy.get(`.anticon.mr-2`).eq(0).click();
});

Then(`table should be refreshed`, () => {
  cy.wait(`@refresh`).its(`response.statusCode`).should(`eq`, 200);
});

// Scenario: Verify admin can click custom columns icon
When(`admin clicks custom columns icon`, () => {
  cy.get(`.ant-table-container`).should(`be.visible`);
  cy.get(`.d-flex`).should('be.visible');
  cy.get(`#columns-filter-button-vip`).click();
});

Then(`admin should see the draggable custom columns dropdown options`, () => {
  cy.get(`.ant-popover-content`).should('be.visible');
  cy.contains(`.ant-popover-title > div`, 'Custom Columns').should(
    'be.visible',
  );
});

// Scenario: Verify admin can click download csv icon
When(`admin clicks download csv icon`, () => {
  cy.get(`span.anticon.mr-1`, { timeout: 30000 }).eq(1).click();
});

Then(`download csv modal will show`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`.ant-btn-primary`).should('be.visible');
});
