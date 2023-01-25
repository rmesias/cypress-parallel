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

// Scenario: Header Virtual Sports exist
Then(`{string} exist in the header`, () => {
  //cy.get(`.desktop ul`).find(`li:nth-child(4)`).contains(virtualSports);
  cy.get(`[href="/virtual-sports"]`).should(`exist`).and(`be.visible`);
});

// Scenario: Landing content contains Virtual Sports BET HERE button
Then(`Virtual Sports BET HERE button exist`, () => {
  cy.get(`.best-online ul`)
    .find(`li:last h5`)
    .contains(`VIRTUAL SPORTS`)
    .siblings(`div:last`)
    .find(`button`)
    .contains(`BET HERE`);
});

// Scenario: Header Virtual Sports tab redirect to Virtual Sports page
When(`member clicks Virtual Sports tab`, () => {
  cy.get(`[href="/virtual-sports"]`).click();
  cy.url().should(`include`, `/virtual-sports`);
});

Then(`member is redirected to Virtual Sports page`, () => {
  cy.get(`[data-testid="event-bar"]`).should(`exist`).and(`be.visible`);
});

// Scenario: Landing page content Virtual Sports cta BET HERE redirect to Virtual Sports page
When(`member clicks Virtual Sports BET HERE button`, () => {
  cy.get(`.best-online ul>li:last >div:last`).click();
});
