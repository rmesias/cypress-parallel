/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

let context: Cypress.LoginOutputs;

before(() => {
  cy.siteAuthentication({
    inputs: {
      credentials: Cypress.env(`prodSiteCredentials`),
      site: Cypress.env(`prodAuthURL`),
      code: Cypress.env(`prodAdminCode`),
    },
  }).then((response) => {
    context = response;
    cy.setLocalStorage(`ADMIN_CODE`, Cypress.env(`prodAdminCode`));
    cy.setLocalStorage(`ACCESS_TOKEN`, context.access);
    cy.setLocalStorage(`CURRENT_ENVIRONMENT`, `production`);
    cy.saveLocalStorage();
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.intercept(`POST`, `/graphql?defaultCurrency`).as(`modalStatus`);
  cy.visit(`/`);
  cy.wait(`@modalStatus`)
    .its(`response.statusCode`, { timeout: 20000 })
    .should(`eq`, 200);
});

// Scenario: Member user should show up at the the header
Then(`username exist at the header`, () => {
  cy.findByText(Cypress.env(`prodSiteUsername`), { selector: `p` }).should(
    `exist`,
  );
});

// Scenario Outline: Account transactions <options> exist
When(`member clicks username`, () => {
  cy.findByText(Cypress.env(`prodSiteUsername`), { selector: `p` })
    .should(`exist`)
    .click()
    .then(() => {
      cy.findByText(`Transactions`).should(`exist`);
    });
});

Then(`account transactions {string} exist`, (optionsList: string) => {
  if (optionsList === `Deposit`) {
    cy.findByText(optionsList, { selector: `div` }).should(`exist`);
  } else {
    cy.findByRole(`button`, { name: optionsList }).should(`exist`);
  }
});

// Scenario Outline: Transactions History <history> exist
Then(`transaction history {string} exist`, (optionsList: string) => {
  cy.findByRole(`button`, { name: optionsList }).should(`exist`);
});

// Scenario: Personal Informations list exist
Then(`personal information list exist`, (dataTable: any) => {
  const personalInfo: any = dataTable.hashes();
  personalInfo.forEach((item: any) => {
    cy.findByRole(`button`, { name: item.personalInfo }).should(`exist`);
  });
});
