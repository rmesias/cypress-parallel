/// <reference types="cypress" />

import { Then, Given, When } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  // visit web-staging
  cy.visit(`/`);
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

//checks if the user is in web wallet landing page
Given(`User should be in Web Wallet landing page logout mode`, () => {
  cy.contains(`Login`);
});

//User clicks links in site information
// Then(`user should see the {string}`, (btn: string) => {
//  cy.scrollTo('bottom');
//   cy.contains(btn);
// });

// User clicks specific link and redirected to new page
When(`{string} is click`, (btn1: string) => {
  cy.scrollTo('bottom');
  cy.contains(btn1).click();
});

//User is redirected to new page
Then(`user should be redirected to {string}`, (link: string) => {
  cy.url().should(`contains`, link, { timeout: 50000 });
});
