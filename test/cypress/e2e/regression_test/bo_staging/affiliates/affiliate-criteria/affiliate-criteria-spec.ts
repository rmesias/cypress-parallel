import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

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
  cy.get(`.date-ranges`).should(`exist`);
  cy.get(`div[title='Affiliates']`).click({ force: true });
  cy.get(`.ant-menu-vertical li:nth-child(2)`)
    .should('contain.text', 'Affiliate Criteria')
    .click({ force: true });
});

Then(
  `real name gender date of birth number and email are enabled on Mandatory`,
  () => {
    cy.get(`label.ant-radio-wrapper-checked`).should(`have.length`, 8);
  },
);

Then(`address qq wechat title phone number are enabled on Optional`, () => {
  cy.get(`label.ant-radio-wrapper-checked`).should(`have.length`, 8);
});
