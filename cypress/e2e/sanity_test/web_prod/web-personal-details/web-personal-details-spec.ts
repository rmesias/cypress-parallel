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

// Scenario: Personal Details modal exist
When(`member click Personal Details at the profile option`, () => {
  cy.findByText(Cypress.env(`prodSiteUsername`), { selector: `p` })
    .should(`exist`)
    .click()
    .then(() => {
      cy.wait(1000);
      cy.findByText(`Personal Information`).should(`exist`);
      cy.findByRole(`button`, { name: `Personal Details` })
        .should(`exist`)
        .click();
    });
});

Then(`Personal Details modal is shown`, () => {
  cy.findByText(`Personal Details`, { selector: `h2` }).should(`exist`);
});

// Scenario Outline: Member Personnal info <fields> are correct
Given(`browser is at member Personal info modal`, () => {
  cy.findByText(Cypress.env(`prodSiteUsername`), { selector: `p` })
    .should(`exist`)
    .click()
    .then(() => {
      cy.wait(2000);
      cy.findByText(`Personal Information`).should(`exist`);
      cy.findByRole(`button`, { name: `Personal Details` })
        .should(`exist`)
        .click();
    });
});

Then(`member personal info {string} is shown`, (value: string) => {
  if (value === `Female` || value === `Ms/Mrs.`) {
    cy.findByText(value).should(`exist`);
  } else {
    cy.findByDisplayValue(value).should(`exist`);
  }
});

// Scenario: Member emails and notification are correct
Then(`all member emails and notification are checked`, () => {
  cy.get(`.email-notify label`).each((element) => {
    cy.wrap(element).should(`attr`, `data-checked`);
  });
});

// Scenario: Button update personal Info
Then(`button for updating personal info exist`, () => {
  cy.findByText(`Update Personal Info`, { selector: `button` }).should(`exist`);
});
