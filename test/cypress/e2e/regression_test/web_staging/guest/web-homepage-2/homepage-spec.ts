/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.visit(`/`, { timeout: 100000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

Given(`admin is on the BetVision Homepage 2`, () => {
  cy.url().should(`contains`, 'staging.aonewallet.com/');
});

// Scenario Outline: Verify user can see the specific page
When(`user clicks {string}`, (page: string) => {
  cy.contains(
    `div.chakra-container > div > div > ul[role='list'] > li > p`,
    page,
    { timeout: 40000 },
  ).click();
});

Then(`user should be routed to {string} page`, (url: string) => {
  cy.url().should(`contains`, url);
});

// Scenario Outline: Verify user can click specific icon
When(`user click {string}`, (img: string) => {
  cy.get(`img[alt='${img}']`).should(`be.visible`);
});

Then(
  `{string} should contains the link of the desired page`,
  (href: string) => {
    cy.get(`a[href='${href}']`).should(`be.visible`);
  },
);

// Scenario Outline: Verify user can click icon
When(`user click {string} icon`, (img: string) => {
  cy.get(`img[src='${img}']`).click();
});

Then(`user redirected to {string}`, (link: string) => {
  cy.url().should(`contains`, link);
});
