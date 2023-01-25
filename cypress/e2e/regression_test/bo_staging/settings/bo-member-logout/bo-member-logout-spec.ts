import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';

let context: Cypress.LoginOutputs;

before(() => {
  cy.boAuthentication({
    inputs: {
      credentials: Cypress.env(`boStagingCredentials`),
      site: Cypress.env(`backOfficeStagingAuthURL`),
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
});

Given(`admin is already login to Back Office wallet`, () => {
  cy.contains(`Total bet amount`).should(`exist`);
  expect(localStorage.getItem(`BOaccessToken`)).to.exist;
  cy.intercept(`POST`, `/graphql?me`).as(`dashboardStatus`);
});

When(`admin clicks account name at the upper right corner of the page`, () => {
  cy.wait('@dashboardStatus').its(`response.statusCode`).should(`eq`, 200);
  cy.get(`[data-target="profile-username"]`).should(`exist`).click();
});

When(`selects logout`, () => {
  cy.contains(`Logout`).should(`exist`).click();
});

Then(`admin is redirectec to sign in page`, () => {
  cy.url().should(`eq`, `https://admin-staging.aonewallet.com/signin`);
});
