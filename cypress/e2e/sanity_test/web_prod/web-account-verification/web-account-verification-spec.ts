/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
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

// Scenario: Account verification modal
When(`member click Account Verification at the profile option`, () => {
  cy.get(`[aria-label="Profile Options"]`, { timeout: 20000 }).should('exist');
  cy.get(`[aria-label="Profile Options"]`, { timeout: 20000 })
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Personal Information`)
    .siblings(`div`)
    .children(`div:first`)
    .click();
});

Then(`account verification modal is shown`, () => {
  cy.get(`.custom-scroll .chakra-select__wrapper`).should(`exist`);
  cy.get(`.custom-scroll img`).should(`exist`);
});

// Scenario: Deposit button exist for verified user
Given(`browser is at member Account Verification modal`, () => {
  cy.get(`[aria-label="Profile Options"]`).should('exist');
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Personal Information`)
    .siblings(`div`)
    .children(`div:first`)
    .click();
});

Then(`Deposit button exist`, () => {
  cy.contains(`.custom-scroll [type="button"]`, `Deposit`).should(`exist`);
});

// Scenario: Verify that member can select type of document to be uploaded
When(`member selects {string} as document to uploaded`, (options: string) => {
  cy.get(`.custom-scroll .chakra-select`).select(options);
});

Then(`an Upload File button should be visible`, () => {
  cy.contains(`Upload File`).should(`exist`);
});

// Scenario: Shared documents
Then(`Shared document exist with name, date and a delete button`, () => {
  cy.get(`[data-testid="shared-documents-container"] .chakra-text`).each(
    ($element) => {
      const text = $element.get(0).innerText;
      expect(text.length).to.greaterThan(1);
      expect(text).not.NaN;
    },
  );

  cy.get(`[data-testid="shared-documents-container"] svg`).should(`exist`);
});
