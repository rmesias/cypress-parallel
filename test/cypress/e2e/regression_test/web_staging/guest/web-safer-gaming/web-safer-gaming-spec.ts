/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import moment from 'moment';

beforeEach(() => {
  cy.visit(`/`, { timeout: 100000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

Given(`admin click on {string} tab`, (tab: string) => {
  cy.wait(1000);
  cy.contains(`li > p.chakra-text`, tab, { timeout: 30000 }).click();
  cy.contains(`li > p.chakra-text`, tab, { timeout: 30000 }).click();
});

// Scenario: Verify user can see the casino page
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

//Scenario: User should see today's date
Then(`user should see the date today`, () => {
  cy.log(moment().format('MMM D ddd[,] YYYY'));
  cy.get(
    `[data-testid='event-bar'] ul[role='list']:nth-child(2) > li:nth-child(3) > p`,
  ).should(`contains.text`, moment().format('MMM DD ddd , YYYY'));
});

// Scenario: User click Safer Gaming
When(`user click {string}`, (tab: string) => {
  cy.contains(`button > span:nth-child(1)`, tab, { timeout: 30000 }).should(
    `be.visible`,
  );
  cy.contains(`button > span:nth-child(1)`, tab).click({ force: true });
});

Then(`user should see list of safer gaming`, (dataTable: any) => {
  const table = dataTable.hashes();
  for (let i = 0; i < table.length; i++) {
    cy.get(`div > div[role='menu'] > button[role='menuitem'] > p`).should(
      `contain.text`,
      table[i].list,
    );
  }
});

Then(`user should see list of play safe`, (dataTable: any) => {
  const table = dataTable.hashes();
  for (let i = 0; i < table.length; i++) {
    cy.get(
      `div:nth-child(4) > div[role='menu'] > button[role='menuitem'] > p`,
    ).should(`contain.text`, table[i].list);
  }
});

Then(`user should see list of support`, (dataTable: any) => {
  const table = dataTable.hashes();
  for (let i = 0; i < table.length; i++) {
    cy.get(
      `div:nth-child(6) > div[role='menu'] > button[role='menuitem'] > p`,
    ).should(`contain.text`, table[i].list);
  }
});

// Scenario Outline: User click safer gaming, play safe and support lists
When(`user click safer gaming {string}`, (tab: string) => {
  cy.contains(
    `div > div[role='menu'] > button[role='menuitem'] > p`,
    tab,
  ).click({ force: true });
});

When(`user click play safe {string}`, (tab: string) => {
  cy.contains(
    `div:nth-child(4) > div[role='menu'] > button[role='menuitem'] > p`,
    tab,
  ).click({ force: true });
});

When(`user click support {string}`, (tab: string) => {
  cy.contains(
    `div:nth-child(6) > div[role='menu'] > button[role='menuitem'] > p`,
    tab,
  ).click({ force: true });
});
