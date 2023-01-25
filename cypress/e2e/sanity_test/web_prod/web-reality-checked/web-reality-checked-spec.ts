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
When(`member click Reality Checked at the profile option`, () => {
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Personal Information`)
    .siblings(`div`)
    .children(`div:nth-child(3)`)
    .click();
});

Then(`Reality Checked modal is shown`, () => {
  cy.contains(
    `.chakra-modal__content .chakra-modal__header`,
    `Reality Check`,
  ).should(`exist`);
});

// Scenario: Elapsed time should start at 00 seconds after login
Given(`browser is at member Reality check modal`, () => {
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Personal Information`)
    .siblings(`div`)
    .children(`div:nth-child(3)`)
    .click();
});

Then(`Elapsed time should start at 0 minutes and 0 seconds`, () => {
  cy.contains(`Elapsed Time`)
    .siblings(`p`)
    .should((element) => {
      const minutes = element.get(0).innerText.split(' ');
      const doubleDigit = minutes[0].split(`.`);
      expect(parseFloat(doubleDigit[0])).to.equal(0);
      expect(parseFloat(doubleDigit[1])).to.be.lessThan(10);
    });
});

// Scenario: Betting History
Then(`Betting history cta exist`, () => {
  cy.contains(`.chakra-modal__content .chakra-text`, `Betting History`).should(
    `exist`,
  );
});

// Scenario: Logout
Then(`Logout cta exist`, () => {
  cy.contains(`.chakra-modal__content .chakra-text`, `Logout`).should(`exist`);
});

// Scenario Outline: Verify that user can set to <elapsedTime> elapsed time
Then(`elapse time will can setted to {string}`, (value: string) => {
  cy.get(`.chakra-form-control select`).select(value);
  cy.get(`.chakra-modal__body .chakra-button`).eq(0).click();
});
