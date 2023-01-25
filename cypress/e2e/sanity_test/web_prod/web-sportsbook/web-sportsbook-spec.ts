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

// Scenario: Header sportsbooks exist
Then(`{string} exist in the header`, (sportsbook: string) => {
  cy.get(`.desktop ul`).find(`li:first`).contains(sportsbook);
});

// Scenario: Landing content contains sportsbook BET HERE button

Then(`Sportsbook BET HERE button exist`, () => {
  cy.get(`.best-online ul`)
    .find(`li:first h5`)
    .contains(`SPORTSBOOK`)
    .siblings(`div:last`)
    .find(`button`)
    .contains(`BET HERE`);
});

// Scenario: Header sportsbook tab redirect to sportsbook page
When(`member clicks Sportsbook tab`, () => {
  cy.get(`.desktop ul>li:first`).click();
});

Then(`member is redirected to Sportsbook page`, () => {
  cy.url().should(`eq`, `https://qa.nexiux.io/sportsbook`);
  // cy.contains(`TOP LEAGUES`).should(`exist`);
});

// Scenario: Landing page content sportsbook cta BET HERE redirect to sportsbook page
When(`member clicks Sportsbook BET HERE button`, () => {
  cy.get(`.best-online ul>li:first >div:last`).click();
});
