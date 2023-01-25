/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.visit(`/`, { timeout: 100000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

Given(`admin click on {string} tab`, (tab: string) => {
  cy.findByText(tab, { timeout: 30000 }).click({ force: true });
});

// Scenario: Verify user can see the feature page
Then(`user should be routed to {string} page`, (page: string) => {
  cy.url().should(`contains`, page);
});

// Scenario Outline: User click specific button and its redirected to
When(`{string} is click`, (btn: string) => {
  cy.contains(`a`, btn).click();
});

Then(`it is redirected to {string}`, (link: string) => {
  cy.url().should(`contains`, link);
});

// Scenario: User click time
When(`user click time`, () => {
  //cy.get(`ul:nth-child(2) > div:nth-child(3) > div`).eq(0).click();
  cy.get(`#timezone--list`).parent().click({ force: true });
});

Then(`user should see time options`, () => {
  cy.get(`select#timezone--list > option`).should('be.visible');
});

// Scenario: When user click read more
When(`user clicks {string} button`, (btn: string) => {
  cy.contains(`button > a`, btn, { timeout: 30000 }).should('be.visible');
  cy.contains(`button > a`, btn, { timeout: 30000 }).eq(0).click();
});
