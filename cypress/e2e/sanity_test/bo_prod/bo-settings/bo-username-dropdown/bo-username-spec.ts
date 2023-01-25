/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
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
  cy.visit('/');
  // cy.get(`input[placeholder='Username']`).type('adminqa1');
  // cy.get(`input[placeholder='Password']`).type('password');
  // cy.contains(`button`, 'Signin').click();
  cy.get(`.date-ranges`, { timeout: 50000 }).should(`exist`);
});

When(`admin click the username beside the admin photo`, () => {
  cy.get(`[data-target="profile-username"]`, { timeout: 30000 }).should(
    'be.visible',
  );
  cy.wait(1000);
  cy.get(`[data-target="profile-username"]`)
    .should(`exist`)
    .click()
    .trigger('mouseover');
});

Then(
  `admin can see {string} and {string} options`,
  (change: string, logout: string) => {
    cy.get(
      `.ant-dropdown > ul.ant-dropdown-menu >  li.ant-dropdown-menu-item:nth-child(1) > span:nth-child(2)`,
    ).should('contain.text', change);
    cy.get(
      `.ant-dropdown > ul.ant-dropdown-menu >  li.ant-dropdown-menu-item:nth-child(2) > span:nth-child(2)`,
    ).should('contain.text', logout);
  },
);
