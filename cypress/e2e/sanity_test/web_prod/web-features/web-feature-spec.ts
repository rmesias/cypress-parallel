/// <reference types="cypress" />
import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';

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

// Scenario: Header Features tab exist
Then(`{string} tab exist in the header`, () => {
  cy.get(`[href="/features"]`).should(`exist`).and(`be.visible`);
});

// Scenario: Header Features tab redirect to Features page
When(`member clicks Features tab`, () => {
  cy.get(`[href="/features"]`).click();
});

Then(`member is redirected to Features page`, () => {
  cy.get(`[data-testid="event-bar"]`).should(`exist`).and(`be.visible`);
});

// Scenario: Promotional widget exist at the Features
Given(`browser is at Features page`, () => {
  cy.visit(`/features`);
});

Then(`all promotional widget exist`, () => {
  cy.get(`[alt="Acca Boost"]`).parent(`div`).siblings();
});

// Scenario Outline: Open promotional details
When(`member clicks Read more {string} of promo widget`, (path: string) => {
  cy.wait(1000);
  cy.get(`.chakra-button > [href='${path}']`, { timeout: 30000 })
    .contains('Read More', { timeout: 30000 })
    .click();
});

Then(`member is redirected to {string} details`, (path: string) => {
  cy.url().should(`contain`, path);
});
