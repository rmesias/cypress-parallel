/// <reference types="cypress" />
import {
  When,
  Given,
  And,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';
let context: Cypress.LoginOutputs;

before(() => {
  cy.boAuthentication({
    inputs: {
      credentials: Cypress.env(`boProdCredentials`),
      site: Cypress.env(`prodAuthURL`),
    },
  }).then((response) => {
    context = response;
    cy.setLocalStorage(`BOaccessToken`, context.access);
    cy.setLocalStorage(`accessToken`, context.access);
    cy.setLocalStorage(`BOrefreshToken`, context.refresh);
    cy.saveLocalStorage();
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.visit(`/`, { timeout: 50000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
  cy.get(`.date-ranges`, { timeout: 50000 }).should(`exist`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.contains(`.ant-col ul li:nth-child(22)`, 'System Management')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:last`)
    .should('contain.text', tab)
    .click({ force: true });
});

// Scenario: Verify Configure Dynamic Pages modal
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

Then(`Admin click the {string} button`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

//Scenario: Admin checks the Terms and Conditions
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks {string}`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks {string} button`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

//Scenario: Admin checks the Privacy Policy
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks {string}`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks {string} button`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

//Scenario: Admin checks the FAQ
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks {string}`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks {string} button`, (btn: string) => {
  //cy.contains(`button`, btn).click();
  cy.contains(`button`, btn).click();
});
