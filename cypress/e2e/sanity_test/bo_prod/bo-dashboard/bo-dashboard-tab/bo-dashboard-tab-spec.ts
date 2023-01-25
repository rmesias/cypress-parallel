/// <reference types="cypress" />
import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import moment from 'moment';

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
  cy.get(`div.d-inline-block > div`).should('contain.text', tab);
});

// Scenario Outline: Verify admin can see the different time expressions
Then(`admin can see {string}`, (time: string) => {
  cy.get(`div.date-ranges > span.mr-4 > a`).should('contain.text', time);
});

// Scenario: Verify Start date and End date should be equal today
Then(`{string} should be equal today`, (date: string) => {
  cy.get(`input[placeholder='${date}']`).should(
    'contain.value',
    moment().format('DD/MM/YYYY'),
  );
});
