/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.visit(`/`, { timeout: 100000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

Given(`admin click on {string} tab`, (tab: string) => {
  cy.contains(`li > div > a`, tab, { timeout: 30000 }).click();
  cy.get(`#altenar-sportsbook`).should('exist').and('be.visible');
});

// Scenario Outline: User click specific button and its redirected to
When(`{string} is click`, (btn: string) => {
  cy.contains(`a`, btn).click();
});

Then(`it is redirected to {string}`, (link: string) => {
  cy.url().should(`contains`, link);
});

// Scenario: User should see Top Leagues
Then(`user should see List of Countries in Top Leagues panel`, () => {
  cy.get(`._asb_top-leagues`, { timeout: 30000 }).should('be.visible');
});

// Scenario: User click specific top league option
const rndm = Math.floor(Math.random() * 5);
When(`user click specific option`, () => {
  cy.reload();
  cy.wait(3000);
  cy.get(`._asb_sports-tree `, { timeout: 30000 }).should(`exist`);
  cy.get(`.asb-pos-wide ._asb_top-leagues-item-name`).eq(rndm).click();
});

Then(`panel change matching specific league option`, () => {
  cy.get(`.asb-pos-wide ._asb_top-leagues-item-name`)
    .eq(rndm)
    .invoke('text')
    .then((text) => {
      const textString = text.toString();
      cy.log(textString);
      cy.get(
        `div:nth-child(2) > div > div > div:nth-child(10) > div.asb-nowrap._asb_simple-button`,
      ).should(`contain.text`, textString);
    });
});

// Scenario: User should see the betslip
Then(`the {string} table should be seen`, (bet: string) => {
  cy.get(`._asb_sticky-element-content`, {
    timeout: 90000,
  })
    .eq(0)
    .should('be.visible');
});

// Scenario Outline: User should see the sports icons
When(`user click the {int}{string}`, (index: number, icon: string) => {
  cy.get(
    `div[name="asb-top-sports-scroller"] > div > div:nth-child(2) > div > div._asb_top-sports-scroller-button:nth-child(${index})`,
    { timeout: 30000 },
  )
    .should('contain.text', icon)
    .click();
});

Then(`it is redirected to {string}`, (link: string) => {
  cy.url().should(`contains`, link);
});

// Scenario: User should see Menu list
Then(`menu column should be visible`, () => {
  cy.get(`._asb_sports-tree > ._asb_widget-header`, {
    timeout: 30000,
  }).should('be.visible');
});

// Scenario: User should see Live Now
Then(`live now column should be visible`, () => {
  cy.get(`._asb_top-events-header-label`, { timeout: 30000 }).should(
    'be.visible',
  );
});

// Scenario: User click View all events
When(`user click the {string}`, (event: string) => {
  cy.contains(`div.asb-text > span`, event).click();
});

Then(`user should be routed to {string} panel`, (page: string) => {
  cy.url().should(`contains`, page);
});
