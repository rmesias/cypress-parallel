/// <reference types="cypress" />
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.visit(`/`, { timeout: 80000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

// To verify there is no user logged in
Given(`user should see the Login button`, () => {
  cy.contains(`Login`);
});
// Scenario: Verify user can see the casino page
Then(`user should see the {string}`, (btn: string) => {
  cy.scrollTo(`bottom`);
  cy.contains(btn);
});

// Scenario Outline: User click specific button and its redirected to
When(`{string} is click`, (btn: string) => {
  cy.scrollTo(`bottom`);
  cy.contains(btn).click();
});

Then(`it is redirected to {string}`, (link: string) => {
  cy.url().should(`contains`, link);
});
