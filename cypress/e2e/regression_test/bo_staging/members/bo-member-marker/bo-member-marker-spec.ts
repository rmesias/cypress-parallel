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
  cy.get(`.ant-menu-vertical li:nth-child(2)`)
    .should('contain.text', tab)
    .click({ force: true });
});

// Scenario Outline: Verify can see different tabs under Member Marker management
Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
    `contain.text`,
    tab,
  );
});

// Scenario Outline: Search row must be shown on the left side
Then(`{string} must be shown on the left side`, (search: string) => {
  cy.get(`div.mb-4 > .font-weight-bold`).should('contain.text', search);
});

Then(`Quick Filter must be shown on the left side`, () => {
  cy.get(`.quick-filter-container > div.font-weight-bold`).should(
    'contain.text',
    'Quick Filter',
  );
});

// Scenario Outline: When clicking new operator the information must be shown
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn, { timeout: 30000 }).click();
});

Then(`{string} must be shown`, (info: string) => {
  cy.get(`.ant-legacy-form-item-label > label`).should(`contain.text`, info);
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

// Scenario: Verify admin can click custom columns icon
When(`admin clicks custom columns icon`, () => {
  cy.get(`.d-flex`).should('be.visible');
  cy.get(`.ant-table-content`).should('be.visible');
  cy.wait(5000);
  cy.get(`#columns-filter-button-member-level-management`).click();
});

Then(`admin should see the draggable custom columns dropdown options`, () => {
  cy.get(`.ant-popover-content`).should('be.visible');
  cy.contains(`.ant-popover-title > div`, 'Custom Columns').should(
    'be.visible',
  );
});
