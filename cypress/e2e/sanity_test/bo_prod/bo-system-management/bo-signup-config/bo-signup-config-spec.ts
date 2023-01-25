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

//Verify Sign Up Config Modal
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

Then(`Admin click {string} button`, (modal: string) => {
  cy.contains(`button`, modal).should('contain.text', 'OK').click();
});

//Scenario: Admin enable Interim Safe Gambling Page button
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks Sign Up Config buttons`, () => {
  //Interim Safe Gambling Page
  cy.get(
    ':nth-child(1) > .ant-card-body > .justify-content-between > :nth-child(2) > .ant-switch > .ant-switch-inner',
  ).click();
  //User Country Code Auto Detect
  cy.get(
    ':nth-child(2) > .ant-card-body > .justify-content-between > :nth-child(2) > .ant-switch > .ant-switch-inner',
  ).click();
  //Opt In: Default Check In for Member
  cy.get(
    ':nth-child(3) > .ant-card-body > .justify-content-between > :nth-child(2) > .ant-switch > .ant-switch-inner',
  ).click();
  //TNC & Privacy Policy: Default Check In for Member
  cy.get(
    ':nth-child(4) > .ant-card-body > .justify-content-between > :nth-child(2) > .ant-switch > .ant-switch-inner',
  ).click();
});

Then(`Admin click {string} button`, (modal: string) => {
  cy.contains(`button`, modal).should('contain.text', 'OK').click();
});

//Scenario: Admin enable default Sign in Config status
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin enable Interim Safe Gambling Page button`, () => {
  cy.get(
    ':nth-child(1) > .ant-card-body > .justify-content-between > :nth-child(2) > .ant-switch > .ant-switch-inner',
  ).click();
});

And(`Admin enable User Country Code Auto Detect button`, () => {
  cy.get(
    ':nth-child(2) > .ant-card-body > .justify-content-between > :nth-child(2) > .ant-switch > .ant-switch-inner',
  ).click();
});

Then(`Admin click {string} button`, (modal: string) => {
  cy.contains(`button`, modal).should('contain.text', 'OK').click();
});
