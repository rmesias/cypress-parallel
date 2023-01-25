/// <reference types="cypress" />
import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import Chance from 'chance';
const chance = new Chance();

const generatePassword = (len: number) => {
  return chance.string({ length: len });
};
const randPassword = chance.string({ length: 8 });
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

Given(`change password form is shown`, () => {
  cy.get(`[data-target="profile-username"]`)
    .should(`exist`)
    .click()
    .trigger('mouseover');
  cy.contains(
    `.ant-dropdown > ul.ant-dropdown-menu >  li.ant-dropdown-menu-item:nth-child(1) > span:nth-child(2)`,
    'Change Password',
  ).click();
});

// Scenario: Admin enters incorrect current password
When(`admin enters incorrect current password`, () => {
  cy.get(`[data-testid="password-input"]`).type(generatePassword(8));
  cy.get(`[name="newPassword"]`).type(randPassword);
  cy.get(`[name="confirmNewPassword"]`).type(randPassword);
  cy.get(`[data-testid="submit-button"]`).click();
});

Then(`a confirmation pop-up message {string} is shown`, (message: string) => {
  cy.contains(message).should(`exist`);
});

Then(`a warning message {string} is shown`, (warning: string) => {
  cy.contains(warning).should(`exist`);
});

// Scenario: New Password does no match
When(`admin enters unmatch new password`, () => {
  cy.get(`[data-testid="password-input"]`).type(`password`);
  cy.get(`[name="newPassword"]`).type(generatePassword(8));
  cy.get(`[name="confirmNewPassword"]`).type(generatePassword(8));
  cy.get(`[data-testid="submit-button"]`).click();
});

//  Scenario: Password length validation
When(`admin enters three characters for new password`, () => {
  cy.get(`[data-testid="password-input"]`).type(`password`);
  cy.get(`[name="newPassword"]`).type(`pass`);
  cy.get(`[name="confirmNewPassword"]`).type(`pass`);
  cy.get(`[data-testid="submit-button"]`).click();
});

//  Scenario: empty new password validation
When(`admin leaves new passwords as empty`, () => {
  cy.get(`[data-testid="password-input"]`).type(`password`);
  cy.get(`[data-testid="submit-button"]`).click();
});

//Scenario: New password is the same from old
When(`admin enters password the same as the current`, () => {
  cy.get(`[data-testid="password-input"]`).type(`password`);
  cy.get(`[name="newPassword"]`).type(`password`);
  cy.get(`[name="confirmNewPassword"]`).type(`password`);
  cy.get(`[data-testid="submit-button"]`).click();
});
