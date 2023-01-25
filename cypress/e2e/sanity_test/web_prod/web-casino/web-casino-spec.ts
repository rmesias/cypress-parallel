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

// Scenario: Header Casino exist
Then(`{string} exist in the header`, (casino: string) => {
  //cy.get(`.desktop ul`).find(`li:nth-child(3)`).contains(casino);
  cy.get(`[href="/casino"]`).should(`exist`).and(`be.visible`);
});

// Scenario: Landing content contains Casino PLAY HERE button
Then(`Casino PLAY HERE button exist`, () => {
  cy.get(`.best-online ul`)
    .find(`li:nth-child(2)`)
    .contains(`CASINO`)
    .siblings(`div:last`)
    .find(`button`)
    .contains(`PLAY HERE`);
});

// Scenario: Header Casino tab redirect to Casino page
When(`member clicks Casino tab`, () => {
  cy.wait(1000);
  cy.get(`[href="/casino"]`).click();
});

Then(`member is redirected to Casino page`, () => {
  cy.get(`[data-testid="event-bar"]`).should(`exist`).and(`be.visible`);
});

// Scenario: Landing page content Casino cta PLAY HERE redirect to Casino page
When(`member clicks Casino PLAY HERE button`, () => {
  cy.wait(1000);
  cy.get(`.best-online ul>li:nth-child(2)>div:last`).click();
});
