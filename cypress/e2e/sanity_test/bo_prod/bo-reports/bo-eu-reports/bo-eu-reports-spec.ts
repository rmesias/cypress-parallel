/// <reference types="cypress" />
import {
  And,
  Given,
  Then,
  When,
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
  cy.get(`.date-ranges`, { timeout: 70000 }).should(`exist`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.contains(`.ant-col ul li:nth-child(20)`, 'Reports')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(7)`)
    .should('contain.text', tab)
    .click({ force: true });
});

//Scenario: Admin selects a brand
When(`Admin clicks the brand dropdown box`, () => {
  cy.get('.ant-select-selection-overflow').click({ force: true });
});

Then(`Admin clicks the {string}`, () => {
  cy.contains('testnexiux').click({ force: true });
});

//Scenario: Admin selects Report type
When(`Admin clicks Report type dropdown box`, () => {
  cy.get(':nth-child(2) > .ant-select > .ant-select-selector').click({
    force: true,
  });
});

Then(`Admin should see dropdown options`, () => {
  cy.contains('Daily Self-Exclusion Report').click();
});

//Starting date
//Then(`Admin clicks start date`, () => {
// cy.get(':nth-child(3) > .ant-picker > .ant-picker-input-active > input').click({force: true});
//  cy.get(':nth-child(3) > .ant-picker > .ant-picker-input-active > input').click();
//});

//Scenario: Admin clicks the Generate button
Then(`admin should be able to generate`, () => {
  cy.contains('Generate').click({ force: true });
});

//Scenario: Admin clicks the Download button
Then(`admin should be able to download`, () => {
  cy.contains('Download').click({ force: true });
});
