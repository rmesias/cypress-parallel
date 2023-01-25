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
    .its(`response.statusCode`, { timeout: 50000 })
    .should(`eq`, 200);
});

// Scenario: Safer Gaming modal
When(`member click Safer Gaming at the profile option`, () => {
  cy.findByText(Cypress.env(`prodSiteUsername`), { selector: `p` })
    .should(`exist`)
    .click()
    .then(() => {
      cy.wait(1000);
      cy.findByText(`Personal Information`).should(`exist`);
      cy.findByRole(`button`, { name: `Safer Gaming` }).should(`exist`).click();
    });
});

Then(`Safer Gaming modal is shown`, () => {
  cy.findByText(`Safer Gaming`, { selector: `h2` }).should(`exist`).click();
});

// Scenario Outline: Verify that user can view Profile settings Safer Gaming options
Given(
  `browser is at member Profile settings Safer Gaming History modal`,
  () => {
    cy.findByText(Cypress.env(`prodSiteUsername`), { selector: `p` })
      .should(`exist`)
      .click()
      .then(() => {
        cy.wait(2000);
        cy.findByText(`Personal Information`).should(`exist`);
        cy.findByRole(`button`, { name: `Safer Gaming` })
          .should(`exist`)
          .click();
      });
  },
);

When(`navigate to {string}`, (list: string) => {
  cy.findAllByText(list, { selector: `p` }).eq(0).click();
});

Then(
  `Safer Gaming {string} content fields is displayed`,
  (windowHeaders: string) => {
    cy.findByText(windowHeaders, { selector: `h2` }).should(`exist`).click();
  },
);

// Scenario: Timeout facility
When(`member clicks {string}`, (saferGamingOptions: string) => {
  cy.findAllByText(saferGamingOptions, { selector: `p` }).eq(0).click();
});

Then(`timeout dropdown list and Continue button exist`, () => {
  cy.get(`.chakra-modal__body .chakra-select`).should(`exist`);
  cy.findByRole(`button`, { name: `Continue` }).should(`exist`);
});

// Scenario: Self Exclusion
Then(`Self Exclusion select and Continue button exist`, () => {
  cy.get(`.chakra-modal__body .chakra-select`).should(`exist`);
  cy.findByRole(`button`, { name: `Continue` }).should(`exist`);
});

// Scenario: Account Closure
Then(`Account Closure select and Continue button exist`, () => {
  cy.get(`.chakra-modal__body .chakra-select`).should(`exist`);
  cy.findByRole(`button`, { name: `Continue` }).should(`exist`);
});

// Scenario: Limitations
Then(`Limitations month, amount and Confirm button exist`, () => {
  cy.get(`.chakra-modal__body .chakra-select`).eq(0).should(`exist`);
  cy.get(`.chakra-modal__body .chakra-select`).eq(1).should(`exist`);
  cy.findByRole(`button`, { name: `Confirm` }).should(`exist`);
});

// Scenario: Self Assessment
Then(`Self Assessment Start Test button exist`, () => {
  cy.findByRole(`button`, { name: `Start Test` }).should(`exist`);
});
