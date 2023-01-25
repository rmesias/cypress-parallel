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

// Scenario: RTP at the header
Then(`RTP exist at landing page header`, () => {
  cy.contains(`[href="/rtp"]`, `RTP`).should(`exist`);
});

// Scenario: RTP at Footer
Then(`RTP exist at footer`, () => {
  cy.contains(`RTPs`).should(`exist`);
});

// Scenario: Navigate to RTP from header cta
When(`member click RTP`, () => {
  cy.contains(`[href="/rtp"]`, `RTP`).should(`exist`).click();
});

Then(`member is redirected to RTP page`, () => {
  cy.url().should(`eq`, `https://qa.nexiux.io/rtp`);
  cy.request(`https://qa.nexiux.io/rtp`).then((response) => {
    expect(response.status).to.equal(200);
  });
});

// Scenario: Navigate to RTP from Footer cta
When(`member clicks RTP cta at footer`, () => {
  cy.contains(`RTPs`).click();
});
