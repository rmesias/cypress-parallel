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
  cy.get(`.ant-menu-vertical li:nth-child(2)`)
    .should('contain.text', tab)
    .click({ force: true });
  cy.intercept(`POST`, `/graphql?memberBetRecordsTotalValues`).as(
    `tableLoadStatus`,
  );
});

// Scenario: verify can reset custom columns
When(`admin clicks {string} icon`, () => {
  cy.wait(`@tableLoadStatus`, { timeout: 50000 })
    .its(`response.statusCode`)
    .should(`eq`, 200);
  cy.get(`.ant-table-container`).should('be.visible');
  cy.get(`#columns-filter-button-member-bet-records`).click();
});

Then(`admin clicks the {string} button`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

Then(`admin should see all checkboxes options will be checked`, () => {
  cy.get(`div.ant-popover-content`).should('be.visible');
  cy.contains(`button`, 'Apply').click();
});

Then(
  `{string} must be shown at the first column of the table`,
  (tab: string) => {
    cy.wait(`@tableLoadStatus`, { timeout: 50000 })
      .its(`response.statusCode`)
      .should(`eq`, 200);
    cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
      `contain.text`,
      tab,
    );
  },
);

Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
    `contain.text`,
    tab,
  );
});

Then(`{string} must be shown on the left side`, (search: string) => {
  cy.get(`div > span`).should('contain.text', search);
});

When(`admin click {string}`, (btn: string) => {
  cy.contains(`:nth-child(3) > div > button > span`, btn).click();
});

Then(`the {string} modal will show`, (modal: string) => {
  cy.get(`.ant-modal-header > div.ant-modal-title`).should(
    'contain.text',
    modal,
  );
});
