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

// Scenario: Limitation modal
When(`member click Limitation at the profile option`, () => {
  cy.findByText(Cypress.env(`prodSiteUsername`), { selector: `p` })
    .should(`exist`)
    .click()
    .then(() => {
      cy.wait(1000);
      cy.findByText(`Personal Information`).should(`exist`);
      cy.findByRole(`button`, { name: `Limitations` }).should(`exist`).click();
    });
});

Then(`Limitation modal is shown`, () => {
  cy.findByText(`Limitations`, { selector: `h2` }).should(`exist`);
});

// Scenario: Limitations
Given(`browser is at member Profile settings Limitation modal`, () => {
  cy.findByText(Cypress.env(`prodSiteUsername`), { selector: `p` })
    .should(`exist`)
    .click()
    .then(() => {
      cy.wait(2000);
      cy.findByText(`Personal Information`).should(`exist`);
      cy.findByRole(`button`, { name: `Limitations` }).should(`exist`).click();
    });
});

Then(`Limitations month, amount and Confirm button exist`, () => {
  cy.findByText(`MONTHLY`).should(`exist`);
  cy.findByText(`250`).should(`exist`);
  cy.findByRole(`button`, { name: `Confirm` }).should(`exist`);
  // cy.get(`.chakra-modal__body .chakra-select`, { timeout: 50000 })
  //   .eq(0)
  //   .should(`exist`);
  // cy.get(`.chakra-modal__body .chakra-select`, { timeout: 50000 })
  //   .eq(1)
  //   .should(`exist`);
  // cy.contains(`.chakra-modal__body .chakra-button`, `Confirm`).should(`exist`);
});
