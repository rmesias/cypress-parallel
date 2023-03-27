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

Given(`user click the profile name`, () => {
  if (Cypress.config('baseUrl') === 'https://qa-staging.aonewallet.com/') {
    cy.contains(`.chakra-text`, 'resttest').click();
  } else if (
    Cypress.config('baseUrl') === 'https://qa-next-staging.aonewallet.com/'
  ) {
    cy.contains(`.chakra-text`, 'transact').click();
  }
});

// Scenario Outline: User navigate to .. modal
When(`user click {string}`, (menu: string) => {
  cy.contains(`div[role='button']`, menu).click({ force: true });
});

Then(`{string} modal should appear`, (modal: string) => {
  cy.contains(`h2`, modal).click();
});

//Scenario: User navigate to deposit menu
Then(`deposit modal should appear`, () => {
  cy.get(`.custom-scroll`).should(`be.visible`);
});

// Scenario: User navigate to withdrawal menu
Then(`withdrawal modal should appear`, () => {
  cy.get(`div[data-testid='withdrawable-balance']`).should(`be.visible`);
});

// Scenario: When user navigate to open bets menu
Then(`it should be redirected to {string}`, (url: string) => {
  cy.url().should(`contains`, url);
});

// Scenario: When user navigate to account verification menu
Then(`image of account is verified will show`, () => {
  cy.get(`img[alt='image_verified']`).should(`be.visible`);
});

// Scenario: When user navigate to reality check menu
Then(`reality check modal should appear`, () => {
  cy.get(`.chakra-modal__header`).should(`be.visible`);
});
