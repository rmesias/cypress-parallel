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
  cy.get(`.ant-menu-vertical li:first`)
    .should('contain.text', tab)
    .click({ force: true });
});

// Scenario Outline: Verify can see different tabs under Member management
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

// Scenario Outline: When click Advanced filter on Search row
When(`{string} is click on search row`, (btn: string) => {
  cy.contains(`div[role='button'] > div > a`, btn).click();
});

Then(
  `{string} from advanced filter must be shown on the left side`,
  (search: string) => {
    cy.get(`div > div  > span`).should('contain.text', search);
  },
);

// Scenario Outline: When clicking new the information must be shown
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

// Scenario: Verify admin can click refresh icon
When(`admin clicks refresh icon`, () => {
  cy.get(`.d-flex`).should('be.visible');
  cy.intercept(`POST`, `/graphql?members`).as(`refresh`);
  cy.get(`.anticon.mr-2`).eq(0).click();
  cy.get(`.anticon.mr-2`).eq(0).click();
});

Then(`table should be refreshed`, () => {
  cy.wait(`@refresh`).its(`response.statusCode`).should(`eq`, 200);
});

// Scenario: Verify admin can click custom columns icon
When(`admin clicks custom columns icon`, () => {
  cy.get(`.d-flex`).should('be.visible');
  cy.get(`[data-testid="members-table"]`).should('be.visible');
  cy.wait(5000);
  cy.get(`#columns-filter-button-member-management`).click();
});

Then(`admin should see the draggable custom columns dropdown options`, () => {
  cy.get(`.ant-popover-content`).should('be.visible');
  cy.contains(`.ant-popover-title > div`, 'Custom Columns').should(
    'be.visible',
  );
});

// Scenario Outline: When hovering more actions menu items must be shown
When(`admin hovers more actions button`, () => {
  cy.get(`[data-testid="members-table"]`).should('be.visible');
  cy.get(`.mr-2 > button.ant-dropdown-trigger`).trigger('mouseover');
});
Then(`{string} more actions item must be shown`, (tab: string) => {
  cy.get(
    `ul.ant-dropdown-menu > li.ant-dropdown-menu-item > button.ant-btn-link`,
  ).should(`contain.text`, tab);
});
