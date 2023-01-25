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
  cy.get(`.date-ranges`).should(`exist`);
  cy.get(`.ant-col ul li:nth-child(20)`).click();
  cy.get('.ant-menu-vertical').should(`exist`);
  cy.wait(1000);
  cy.get('.ant-menu-vertical li:nth-child(4)').click();
});

// Scenario: Promo Payout Records default view
Given(`browser is at Promo Payout Records`, () => {
  cy.get(`.ant-table-thead`).should(`exist`);
  cy.get(`.ant-table-tbody`).find(`tr`).should(`have.length.at.least`, 1);
});

Then(`payout records is shown`, () => {
  cy.get(`.ant-table-tbody`).find(`tr`).should(`have.length.at.least`, 2);
});

//   Scenario: Refresh Promo Payout Records
When(`admin clicks refresh button`, () => {
  cy.intercept(`POST`, `/graphql?promoPayoutRecords`).as(`refresh`);
  cy.get(`.d-flex >span >svg`).eq(0).click();
  cy.wait(1000);
});

Then(`payout records is reloaded`, () => {
  cy.wait(`@refresh`).its(`response.statusCode`).should(`eq`, 200);
});
