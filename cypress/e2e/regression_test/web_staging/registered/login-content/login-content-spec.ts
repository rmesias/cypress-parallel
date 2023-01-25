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

Given(`user is login on BetVision`, () => {
  if (Cypress.config('baseUrl') === 'https://qa-staging.aonewallet.com/') {
    cy.contains(`[aria-label='Profile Options'] > p`, 'resttest').should(
      'be.visible',
    );
  } else if (
    Cypress.config('baseUrl') === 'https://qa-next-staging.aonewallet.com/'
  ) {
    cy.contains(`[aria-label='Profile Options'] > p`, 'transact').should(
      'be.visible',
    );
  }
});

// Scenario: Verify user can see the following upon login
Then(`user can see the list`, (dataTable: any) => {
  const table = dataTable.hashes();
  for (let i = 0; i < table.length; i++) {
    cy.get('.chakra-text').should(`contain.text`, table[i].list);
  }
});

// Scenario: When user click the deposit button
When(`user click the {string} button`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

Then(`the modal for deposit will show`, () => {
  cy.get(`.chakra-modal__body`).should('be.visible');
});

// Scenario: When user click the open bets tab
When(`user click {string} tab`, (btn: string) => {
  cy.contains(`.chakra-text`, btn).click();
});

Then(`it should be redirected to {string}`, (url: string) => {
  cy.url().should(`contains`, url);
});

// Scenario: When user click the inbox tab
Then(`{string} modal will show`, (modal: string) => {
  cy.contains(`h2`, modal).click();
});

// Scenario: When user click the profile option name
When(`user click the profile name`, () => {
  if (Cypress.config('baseUrl') === 'https://qa-staging.aonewallet.com/') {
    cy.contains(`.chakra-text`, 'resttest').click();
  } else if (
    Cypress.config('baseUrl') === 'https://qa-next-staging.aonewallet.com/'
  ) {
    cy.contains(`.chakra-text`, 'transact').click();
  }
});

Then(`{string} column and {string} will show`, (col1: string, col2: string) => {
  cy.get(`div:nth-child(2) > div`).should('contain.text', col1);
  cy.get(`div:nth-child(3) > div`).should(`contain.text`, col2);
});

// Scenario: When user click the logout button
When(`user click {string}`, (btn: string) => {
  cy.contains(`div[role='button']`, btn).click({ force: true });
});

Then(`{string} will show`, (prompt: string) => {
  cy.contains(prompt).should(`exist`);
});
