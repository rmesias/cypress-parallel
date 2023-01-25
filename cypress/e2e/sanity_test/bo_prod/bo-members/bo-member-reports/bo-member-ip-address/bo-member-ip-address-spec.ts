/// <reference types="cypress" />
import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
let context: Cypress.LoginOutputs;

before(() => {
  cy.boAuthentication({
    inputs: {
      credentials: Cypress.env(`boStagingCredentials`),
      site: Cypress.env(`backOfficeStagingAuthURL`),
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
  cy.wait(1000);
  cy.contains(`div[title='Member Reports']`, 'Member Reports', {
    timeout: 30000,
  })
    .click({ force: true })
    .trigger('mouseover');
  cy.contains(`ul[id='member-reports$Menu'] > li`, tab, {
    timeout: 30000,
  }).click({ force: true });
});

Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
    `contain.text`,
    tab,
  );
});

// Scenario Outline: Search row must be shown on the left side
Then(`{string} must be shown on the left side`, (search: string) => {
  cy.get(`div.d-flex.justify-content-between > div > span`).should(
    'contain.text',
    search,
  );
});

Then(`Quick Filter must be shown on the left side`, () => {
  cy.get(`.quick-filter-container > div.font-weight-bold`).should(
    'contain.text',
    'Quick Filter',
  );
});

// Scenario: Verify admin can click save search button
When(`admin clicks save search button`, () => {
  cy.get(`.sidebar-shrink .mb-3 a`, { timeout: 1000 }).eq(0).click();
});

Then(`admin should see save search modal`, () => {
  cy.get(`.ant-modal-content`).should('be.visible');
  cy.get(`#rcDialogTitle0`)
    .should('be.visible')
    .should('have.text', 'Save Search');
});

// Scenario: Verify admin can click search settings icon
When(`admin clicks search settings icon`, () => {
  cy.get(`span.anticon.anticon-setting`, { timeout: 1000 }).eq(0).click();
});

Then(`admin should see search settings icon`, () => {
  cy.get(`.ant-modal-content`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Search Settings');
});

// Scenario: Verify admin can click refresh icon
When(`admin clicks refresh icon`, () => {
  cy.get(`.ant-table-content`).should('be.visible');
  cy.intercept(`POST`, `/graphql?memberIpAddressReport`).as(`refresh`);
  cy.get(`.anticon.mr-2`).eq(0).click();
  cy.get(`.anticon.mr-2`).eq(0).click();
});

Then(`table should be refreshed`, () => {
  cy.wait(`@refresh`).its(`response.statusCode`).should(`eq`, 200);
});

// Scenario: Verify admin can click custom columns icon
When(`admin clicks custom columns icon`, () => {
  cy.get(`.d-flex`).should('be.visible');
  cy.get(`.ant-table-container`).should('be.visible');
  cy.wait(5000);
  cy.get(`#columns-filter-button-member-ip-address-summary`).click();
});

Then(`admin should see the draggable custom columns dropdown options`, () => {
  cy.get(`.ant-popover-content`).should('be.visible');
  cy.contains(`.ant-popover-title > div`, 'Custom Columns').should(
    'be.visible',
  );
});

// Scenario: Verify admin can click download csv icon
When(`admin clicks download csv icon`, () => {
  cy.get(`.ant-col.ant-col-12 > div > div > span.mr-1`, { timeout: 1000 })
    .eq(0)
    .click();
});

Then(`download csv modal will show`, () => {
  cy.get(`div.ant-modal-content`).should('be.visible');
  cy.get(`.ant-btn-primary`).should('be.visible');
});
