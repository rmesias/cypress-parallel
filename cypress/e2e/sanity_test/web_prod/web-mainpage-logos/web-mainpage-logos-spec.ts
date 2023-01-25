/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
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

//Admin views betvision logo

When(`Admin clicks betvision logo`, () => {
  cy.get(
    '[src="https://static-development.aonewallet.com/images/@sites/betvision/images/footer/footer-logo.png"]',
  ).click();
});

//Admin views twitter logo

When(`Admin clicks twitter logo`, () => {
  cy.get(
    '[src="https://static-development.aonewallet.com/images/@sites/betvision/images/footer/twitter.png"]',
  ).click();
});

//Admin views mail logo

When(`Admin clicks mail logo`, () => {
  cy.get(
    '[src="https://static-development.aonewallet.com/images/@sites/betvision/images/footer/email.png"]',
  ).click();
});

Then(`Admin should be routed to contact us page`, () => {
  cy.url().should(`eq`, `https://qa.nexiux.io/contact-us`);
});

//Admin views helpcenter logo

When(`Admin clicks helpcenter logo`, () => {
  cy.get(
    '[src="https://static-development.aonewallet.com/images/@sites/betvision/images/footer/help.png"]',
  ).click();
});

Then(`Admin should be routed to helpcenter page`, () => {
  cy.url().should(`eq`, `https://qa.nexiux.io/help-centre`);
});

//Admin views gamstop logo

When(`Admin clicks gamstop logo`, () => {
  cy.get(
    '[src="https://static-development.aonewallet.com/images/@sites/betvision/images/partners/gamestop.jpg"]',
  ).click();
});

//Admin views begambleware logo

When(`Admin clicks begambleware logo`, () => {
  cy.get(
    '[src="https://static-development.aonewallet.com/images/@sites/betvision/images/partners/begambleaware.jpg"]',
  ).click();
});

//Admin views Ibas logo

When(`Admin clicks Ibas logo`, () => {
  cy.get(
    '[src="https://static-development.aonewallet.com/images/@sites/betvision/images/partners/ibas.jpg"]',
  ).click();
});

//Admin views Gambling Commission logo

When(`Admin clicks Gambling Commission logo`, () => {
  cy.get(
    '[src="https://static-development.aonewallet.com/images/@sites/betvision/images/partners/gambling-commission.jpg"]',
  ).click();
});

//Admin views GamCare logo

When(`Admin clicks GamCare logo`, () => {
  cy.get(
    '[src="https://static-development.aonewallet.com/images/@sites/betvision/images/partners/gamecare.jpg"]',
  ).click();
});

//Admin views Safe and Secure transaction logo

When(`Admin clicks Safe and Secure transaction logo`, () => {
  cy.get(
    '[src="https://static-development.aonewallet.com/images/@sites/betvision/images/partners/safe-secure.jpg"]',
  ).click();
});

Then(`Admin should be routed to Safe and Secure transaction page`, () => {
  cy.url().should(`eq`, `https://qa.nexiux.io/safeandsecure`);
});

//Admin views 18+ logo

When(`Admin clicks 18+ logo`, () => {
  cy.get(
    '[src="https://static-development.aonewallet.com/images/@sites/betvision/images/partners/over18.jpg"]',
  ).click();
});

Then(`Admin should be routed to Safer Gaming page`, () => {
  cy.url().should(`eq`, `https://qa.nexiux.io/responsible-gambling`);
});
