import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';

Given(`admin is at {string} page`, (site: string) => {
  cy.visit(`/${site}`);
  cy.intercept(`POST`, `/graphql?me`).as(`dashboardStatus`);
});

When(`admin enters username {string}`, (username: string) => {
  cy.get('div.justify-content-center').should('exist');
  cy.wait(1000);
  cy.get(`[name="account"]`).clear().type(username);
});

When(`enters password {string}`, (password: string) => {
  cy.get(`[name="password"]`).clear().type(password);
});

When(`clicks {string} button`, (btn: string) => {
  cy.get(`[type="submit"]`).should('contain.text', btn).click();
});

Then(`account management All client should exist`, () => {
  cy.contains(`All Client`).should(`exist`);
});

Then(`admin username exist at the top right corner of the page`, () => {
  cy.wait('@dashboardStatus').its(`response.statusCode`).should(`eq`, 200);
  cy.contains(`superadmin`).should(`exist`);
});

Then(`access token exist`, () => {
  cy.getLocalStorage(`SAaccessToken`).should(`exist`);
  cy.getLocalStorage(`SArefreshToken`).should(`exist`);
});
