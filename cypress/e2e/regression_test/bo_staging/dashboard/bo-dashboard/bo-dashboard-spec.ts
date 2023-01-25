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

Given(`admin is on the {string} tab`, (tab: string) => {
  expect(localStorage.getItem(`BOaccessToken`)).to.exist;
  cy.contains(`.ant-col ul li:nth-child(2)`, tab).click({ force: true });
});

// Scenario: Verify can view the screen dashboard screen
When(`user is logged to BO dashboard`, () => {
  cy.restoreLocalStorage();
  cy.visit(`/`);
});

Then(`dashboard screen is displayed`, () => {
  cy.get(`.ant-col ul li`).eq(1).should(`have.text`, `Dashboard`);
});

// Scenario: Verify admin is on the dashboard tab
Then(`tab block should contains {string}`, (tab: string) => {
  cy.get(`div.d-inline-block > div`).should('contain.text', tab);
});

// Scenario Outline: Verify admin can see graph depending on what time expression is clicked
When(`{string} is clicked`, (btn: string) => {
  cy.contains(`div.date-ranges > span.mr-4 > a`, btn, {
    timeout: 30000,
  }).click();
});

Then(`can view time expression graphs`, () => {
  cy.get(`div.py-3`).should('be.visible');
  cy.get(`div.pt-5`).should('be.visible');
});

// Scenario: Verify admin can click and choose the start and end date
When(`admin clicks the calendar icon`, () => {
  cy.get(`.ant-picker-range`).eq(0).click();
});

Then(`can choose start and end date`, () => {
  cy.contains(`.ant-picker-cell-inner`, '15').eq(0).click();
  cy.wait(1000);
  cy.contains(`.ant-picker-cell-inner`, '16').eq(0).click();
});

// Scenario Outline: Verify can click "<card>"
When(`admin click {string}`, (card: string) => {
  cy.contains(`div.date-ranges > span.mr-4 > a`, 'Last Week', {
    timeout: 30000,
  }).click();
  cy.wait(2000);
  cy.contains(`div.ant-card-body > div.mb-2 > div`, card).click();
});

Then(`{string} graph will shown`, (card: string) => {
  cy.contains(`div.ant-card-body > div.mb-2`, card).should('be.visible');
});
