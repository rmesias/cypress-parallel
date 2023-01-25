/// <reference types="cypress" />
import {
  Given,
  Then,
  When,
  And,
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
  cy.visit(`/`);
  cy.get(`.date-ranges`, { timeout: 50000 }).should(`exist`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.contains(tab);
});
//Admin views dashboard today tabs
When(`admin clicks {string} tab`, (tab: string) => {
  cy.contains(tab).click();
});

Then(`admin should see {string} tab`, (bet: string) => {
  cy.contains(bet);
});

And(`admin should see {string} tab`, (dep: string) => {
  cy.contains(dep);
});

And(`admin should see {string} tab`, (wid: string) => {
  cy.contains(wid);
});

And(`admin should see {string} tab`, (wl: string) => {
  cy.contains(wl);
});

And(`admin should see {string} tab`, (net: string) => {
  cy.contains(net);
});
