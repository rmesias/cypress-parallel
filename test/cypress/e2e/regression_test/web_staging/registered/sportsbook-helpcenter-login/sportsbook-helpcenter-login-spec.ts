/// <reference types="cypress" />
import { When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
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

When(
  `user enters username {string} with password {string}`,
  (username: string, password: string) => {
    cy.contains(`Login`).click();
    cy.get(`input[placeholder='Username']`).clear().type(username); //user enters username "resttest" with password "password"
    cy.get(`input[placeholder='Password']`).clear().type(password); //
    cy.contains(`.chakra-modal__body >form>button`, `Login`).click(); //clicks "Login" button
    cy.contains(
      `li > .chakra-toast__inner .chakra-alert__title`,
      `Successfully Authenticated`,
    ); //a confirmation message is received
    cy.get(`.chakra-container >div>div>p:nth-child(2)`).should(`exist`); //user will be redirected to main dashboard where balance is visible
  },
);

When(`user clicks sportsbook tab`, () => {
  cy.contains('.css-15mrx3p > .css-0 > .chakra-text', 'Sportsbook', {
    timeout: 45000,
  }).click();
});

Then(`user should be routed to sportsbook page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/sportsbook`);
});

When(`user clicks casino tab`, () => {
  cy.contains(':nth-child(3) > .css-15mrx3p > .chakra-text', 'Casino').click();
});

Then(`user should be routed to casino page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/casino`);
});

When(`user clicks virtual sports tab`, () => {
  cy.contains(
    ':nth-child(4) > .css-15mrx3p > .chakra-text',
    'Virtual Sports',
  ).click();
});

Then(`user should be routed to virtual sports page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/virtual-sports`);
});

When(`user clicks safe gaming tab`, () => {
  cy.contains(
    ':nth-child(5) > .css-15mrx3p > .chakra-text',
    'Safer Gaming',
  ).click();
});

Then(`user should be routed to safe gaming page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/responsible-gambling`);
});

When(`user clicks features tab`, () => {
  cy.contains(
    ':nth-child(6) > .css-15mrx3p > .chakra-text',
    'Features',
  ).click();
});

Then(`user should be routed to features page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/features`);
});

When(`user clicks betvision logo`, () => {
  cy.visit(`/`);
});

And(`user clicks rtp word link`, () => {
  cy.contains(`[href="/rtp"]`, `RTP`).click();
});

Then(`user should be routed to rtp page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/rtp`);
});

When(`user clicks betvision logo`, () => {
  cy.visit(`/`);
});

And(`user clicks help center word link`, () => {
  cy.contains(`[href="/help-centre"]`, `Help Centre`).click();
});

Then(`user should be routed to help center page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/help-centre`);
});
