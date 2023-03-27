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
  cy.get(`div[title='Reports']`).click({ force: true });
  cy.get('.ant-menu-vertical li:first').click();
  cy.wait(2000);
});

//  Scenario: Daly Operating report default view
Given(`browser is at Daily report`, () => {
  cy.get(`.ant-table-thead`).should(`exist`);
  cy.get(`.ant-table-tbody`).should(`exist`);
});

Then(`operating reports is shown`, () => {
  cy.get(`.ant-table-tbody`).find(`tr`).should(`have.length.at.least`, 1);
});

//  Scenario: Refresh reports
When(`admin clicks refresh button`, () => {
  cy.intercept(`POST`, `/graphql?dailyOperatingReport`).as(`refresh`);
  cy.get(`.d-flex >span >svg`).eq(0).click();
  cy.wait(1000);
});

Then(`operating report is reloaded`, () => {
  cy.wait(`@refresh`).its(`response.statusCode`).should(`eq`, 200);
});
