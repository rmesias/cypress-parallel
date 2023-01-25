/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.visit(`/`, { timeout: 100000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

Given(`admin is on the BetVision Homepage`, () => {
  cy.url().should(`contains`, 'staging.aonewallet.com/');
});

// Scenario: Verify user can click bet here on ..
When(`{string} is click on sportsbook`, (btn: string) => {
  cy.contains(`button`, btn).eq(0).click();
});

When(`{string} is click on casino`, (btn: string) => {
  cy.contains(`button`, btn).eq(0).click();
});

When(`{string} is click on virtual sports`, (btn: string) => {
  cy.contains(':nth-child(3) > div > .chakra-button', btn).click();
});

When(`user click safer gaming`, () => {
  cy.get(
    `img[src='https://static-development.aonewallet.com/images/@sites/betvision/images/safe-gaming.jpg']`,
  )
    .eq(0)
    .click();
});

Then(`user should be routed to {string}  page`, (page: string) => {
  cy.url().should(`contains`, page);
});

// Scenario: Verify user should see the site information and help
Then(`user should see the {string} section`, (page: string) => {
  cy.contains(`h3.chakra-heading`, page).should('be.visible');
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

Then(`altenar icon is visible`, () => {
  cy.get(`img[src='/assets/images/partners/altenar.jpg']`).should('be.visible');
});
