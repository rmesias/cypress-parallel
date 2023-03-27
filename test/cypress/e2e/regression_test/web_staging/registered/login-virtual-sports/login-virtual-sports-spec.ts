/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
let context: Cypress.LoginOutputs;

before(() => {
  if (Cypress.config('baseUrl') === 'https://qa-staging.aonewallet.com/') {
    cy.siteAuthentication({
      inputs: {
        credentials: Cypress.env(`authtest`),
        site: Cypress.env(`siteStagingAuthURL`),
        code: Cypress.env(`stagingAdminCode`),
      },
    }).then((response) => {
      context = response;
      cy.setLocalStorage(`ADMIN_CODE`, Cypress.env(`stagingAdminCode`));
      cy.setLocalStorage(`ACCESS_TOKEN`, context.access);
      cy.setLocalStorage(`CURRENT_ENVIRONMENT`, `Staging`);
      cy.saveLocalStorage();
      localStorage.setItem('DISABLE_ADBLOCK', 'true');
    });
  } else {
    cy.siteAuthentication({
      inputs: {
        credentials: Cypress.env(`authtrans`),
        site: Cypress.env(`siteStagingAuthURL`),
        code: Cypress.env(`stagingAdminCode`),
      },
    }).then((response) => {
      context = response;
      cy.setLocalStorage(`ADMIN_CODE`, Cypress.env(`stagingAdminCode`));
      cy.setLocalStorage(`ACCESS_TOKEN`, context.access);
      cy.setLocalStorage(`CURRENT_ENVIRONMENT`, `Staging`);
      cy.saveLocalStorage();
      localStorage.setItem('DISABLE_ADBLOCK', 'true');
    });
  }
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.visit(`/`, { timeout: 100000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

Given(`admin click on {string} tab`, (tab: string) => {
  cy.findByText('Virtual Sports', { timeout: 30000 }).click();
  cy.wait(2000);
});

// Scenario: Verify user can see the virtual sports page
Then(`user should be routed to {string} page`, (page: string) => {
  cy.url().should(`contains`, page);
});

// Scenario Outline: User click specific button and its redirected to
When(`{string} is click`, (btn: string) => {
  cy.contains(`a`, btn).click();
});

Then(`it is redirected to {string}`, (link: string) => {
  cy.url().should(`contains`, link);
});

// Scenario: User click time
When(`user click time`, () => {
  //cy.get(`ul:nth-child(2) > div:nth-child(3) > div`).eq(0).click();
  cy.get(`#timezone--list`).parent().click({ force: true });
});

Then(`user should see time options`, () => {
  cy.get(`select#timezone--list > option`).should('be.visible');
});

// Scenario Outline: User click Odds
When(`user click odds dropdown`, () => {
  cy.get(`select.chakra-select`).eq(0).click();
});

When(`click {string}`, (opt: string) => {
  cy.get(
    `#__next > div > div > div > div > div > div > ul:nth-child(2) > div:nth-child(2) > div > div > select > option:nth-child(${opt})`,
  ).click({ force: true });
});

Then(`odds should be equal to {string}`, (val: string) => {
  cy.wait(3000);
  cy.get(
    `:nth-child(1) > ._asb_events-table-row > :nth-child(2) > ._asb_events-table-row-markets > :nth-child(1) > :nth-child(1) > ._asb_simple-button > .asb-cut > .asb-flex-cc > span`,
    {
      timeout: 30000,
    },
  )
    .eq(0)
    .should(`contain`, val);
});
