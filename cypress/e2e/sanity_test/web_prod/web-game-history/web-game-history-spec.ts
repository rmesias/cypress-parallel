/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
let context: Cypress.LoginOutputs;

before(() => {
  cy.siteAuthentication({
    inputs: {
      credentials: Cypress.env(`prodSiteCredentials`),
      site: Cypress.env(`prodAuthURL`),
      code: Cypress.env(`prodAdminCode`),
    },
  }).then((response) => {
    context = response;
    cy.setLocalStorage(`ADMIN_CODE`, Cypress.env(`prodAdminCode`));
    cy.setLocalStorage(`ACCESS_TOKEN`, context.access);
    cy.setLocalStorage(`CURRENT_ENVIRONMENT`, `production`);
    cy.saveLocalStorage();
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.intercept(`POST`, `/graphql?defaultCurrency`).as(`modalStatus`);
  cy.visit(`/`);
  cy.wait(`@modalStatus`)
    .its(`response.statusCode`, { timeout: 20000 })
    .should(`eq`, 200);
});

// Scenario: Game history modal exist
When(`member click Game history at the profile option`, () => {
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Transactions`)
    .siblings(`div`)
    .children(`div:nth-child(7)`)
    .click();
});

Then(`game history modal is shown`, () => {
  cy.get(`.chakra-modal__body .chakra-heading`)
    .contains(`Games History`)
    .should(`exist`);
});

// Scenario Outline: Member can view betting history of Game history
Given(`browser is at member Game History modal`, () => {
  // cy.intercept(`POST`, `/graphql?betRecords`).as(`betRecords`);
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Transactions`)
    .siblings(`div`)
    .children(`div:nth-child(7)`)
    .click();
});

When(`selects {string}`, (daysView: string) => {
  cy.get(`.custom-scroll select`).select(daysView);
});

Then(`Total bets should be shown`, () => {
  // cy.wait(`@betRecords`).its(`response.statusCode`).should(`eq`, 200);
  cy.contains(`Total Bets`)
    .siblings(`p`)
    .should((element) => {
      let balance = element.get(0).innerText;
      balance = balance.slice(1);
      expect(parseFloat(balance)).is.to.be.a(`number`);
      expect(parseFloat(balance)).is.not.NaN;
    });
});

Then(`Total Profit and Loss should be shown`, () => {
  cy.contains(`Total Profit/Loss:`)
    .siblings(`p`)
    .should((element) => {
      let balance = element.get(0).innerText;
      balance = balance.slice(1);
      expect(parseFloat(balance)).is.to.be.a(`number`);
      expect(parseFloat(balance)).is.not.NaN;
    });
});
