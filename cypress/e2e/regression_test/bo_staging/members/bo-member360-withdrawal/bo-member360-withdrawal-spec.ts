import {
  Given,
  When,
  And,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';
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
  cy.get(`.date-ranges`, { timeout: 50000 }).should(`exist`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.contains(`.ant-col ul li:nth-child(12)`, 'Withdrawals')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(1)`)
    .should('contain.text', tab)
    .click({ force: true });
});

// Scenario: Admin view all members withdrawal request transaction
When(`table for withdrawal request is shown`, () => {
  cy.get(`.ant-table-thead`).should(`exist`).and(`be.visible`);
  cy.get(`.ant-table-body`).should(`exist`).and(`be.visible`);
});

Then(
  `{string} should not be visible since Remove Balance transaction did not go through`,
  (account: string) => {
    cy.contains(account).should(`not.exist`);
  },
);
