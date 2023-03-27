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
  cy.findByText('Casino', { timeout: 30000 }).click({ force: true });
  cy.wait(2000);
});

// Scenario: Verify user can see the casino page
Then(`user should be routed to {string} page`, (page: string) => {
  cy.url().should(`contains`, page);
});

// Scenario Outline: User click specific button and its redirected to
When(`{string} is click`, (btn: string) => {
  cy.contains(`a`, btn, { timeout: 30000 }).click({ force: true });
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

// Scenario Outline: User click the filter
When(`user click {string} filter`, (btn: string) => {
  cy.contains(`select[data-testid='game-dropdown-filter'] > option`, btn).click(
    { force: true },
  );
});

Then(`{string} should contains text`, (filter: string) => {
  cy.contains(`select[data-testid='game-dropdown-filter']`, filter).should(
    'be.visible',
  );
});

// Scenario: User click login to play
When(`user click {string} button`, (btn: string) => {
  cy.contains(`button`, btn, { timeout: 40000 }).click();
});

Then(`{string} modal will show`, (btn: string) => {
  cy.contains(`.chakra-modal__header`, btn).should('be.visible');
});
