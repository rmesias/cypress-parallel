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
  cy.visit(`/`);
  cy.get(`.date-ranges`, { timeout: 50000 }).should(`exist`);
});

When(`user click the username beside the admin photo`, () => {
  cy.get(`[data-target="profile-username"]`, { timeout: 30000 }).should(
    'be.visible',
  );
  cy.wait(1000);
  cy.get(`[data-target="profile-username"]`)
    .should(`exist`)
    .click()
    .trigger('mouseover');
});

When(`user click the {string} button`, (btn: string) => {
  cy.contains(
    `.ant-dropdown > ul.ant-dropdown-menu >  li.ant-dropdown-menu-item:nth-child(2) > span:nth-child(2)`,
    btn,
  ).click();
});

Then(`the user is redirected to sigin page`, () => {
  cy.url().should(`eq`, `https://admin.nexiux.io/signin`);
});
