/// <reference types="cypress" />
import { When, And, Then } from '@badeball/cypress-cucumber-preprocessor';

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
  cy.get(`[href="/features"]`).should(`exist`).and(`be.visible`);
});

// Scenario: Access "ACCA Boost" Read more
When(`user clicks Feature`, () => {
  cy.get(`[href="/features"]`).click();
  cy.contains(`SPORTSBOOK FEATURES`);
});

And(`user clicks 'Read More' of ACCA Boost`, () => {
  cy.get(`div button a[href="/features/acca-boost"]`)
    .parent()
    .should(`exist`)
    .and(`be.visible`);
});

Then(`user should see ACCA Boost title and cover headers`, () => {
  cy.get(`[data-testid="event-bar"]`).should(`exist`).and(`be.visible`);
  cy.get(`div>img.chakra-image`).eq(0).should('exist').and(`be.visible`);
});

// Scenario: Access "Bet Builder" Read more
When(`user clicks Feature`, () => {
  cy.get(`[href="/features"]`).click();
  cy.contains(`SPORTSBOOK FEATURES`);
});

And(`user clicks 'Read More' of Bet Builder`, () => {
  cy.get(`div button a[href="/features/bet-builder"]`)
    .parent()
    .should(`exist`)
    .and(`be.visible`);
});

Then(`user should see Bet Builder title and cover headers`, () => {
  cy.get(`[data-testid="event-bar"]`).should(`exist`).and(`be.visible`);
  cy.get(`div>img.chakra-image`).eq(1).should('exist').and(`be.visible`);
});

// Scenario: Access "Cash Out" Read more
When(`user clicks Feature`, () => {
  cy.get(`[href="/features"]`).click();
  cy.contains(`SPORTSBOOK FEATURES`);
});

And(`user clicks 'Read More' of Cash Out`, () => {
  cy.get(`div button a[href="/features/cash-out"]`)
    .parent()
    .should(`exist`)
    .and(`be.visible`);
});

Then(`user should see Cash Out title and cover headers`, () => {
  cy.get(`[data-testid="event-bar"]`).should(`exist`).and(`be.visible`);
  cy.get(`div>img.chakra-image`).eq(2).should('exist').and(`be.visible`);
});
