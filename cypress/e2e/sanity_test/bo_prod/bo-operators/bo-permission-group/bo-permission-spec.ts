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
  cy.get(`.date-ranges`, { timeout: 40000 }).should(`exist`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.contains(`.ant-col ul li:nth-child(4)`, 'Operators')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:last`)
    .should('contain.text', tab)
    .click({ force: true });
  cy.intercept(`POST`, `/graphql?totalOnlineMembersCount`).as(
    `tableLoadStatus`,
  );
});

// Scenario Outline: Verify can see different tabs under Permission Group
Then(
  `{string} must be shown first column of the table`,
  (operators: string) => {
    cy.wait(`@tableLoadStatus`, { timeout: 40000 })
      .its(`response.statusCode`)
      .should(`eq`, 200);
    cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
      `contain.text`,
      operators,
    );
  },
);

Then(`{string} must be shown on the table`, (operators: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
    `contain.text`,
    operators,
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

// Scenario Outline: Clicking new permission group the permission must be shown
When(`{string} is click`, (btn: string) => {
  cy.wait(`@tableLoadStatus`, { timeout: 40000 })
    .its(`response.statusCode`)
    .should(`eq`, 200);
  cy.contains(`button`, btn, { timeout: 40000 }).click();
});

Then(`{string} must be shown`, (info: string) => {
  cy.get(`div[role='tab']`).should(`contain.text`, info);
});

Then(`{string} is clickable`, (tab: string) => {
  cy.contains(`.ant-legacy-form-item-children .ant-tabs-tab-btn`, tab)
    .should(`not.be.disabled`)
    .click();
});
