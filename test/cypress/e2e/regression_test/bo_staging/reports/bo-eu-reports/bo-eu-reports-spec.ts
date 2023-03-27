import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
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
  cy.contains(`.ant-col ul li:nth-child(20)`, 'Reports')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(7)`).click({ force: true });
});

// Scenario Outline: Generate EU reports <report>
When(
  `user select {string} with A One Wallet Company brands`,
  (report: string) => {
    cy.get(`.ant-select-selection-overflow`).should(`exist`).click();
    cy.get(`[title="Antonio"]`).click();
    cy.contains(`Custom Reports`).parent().click();
    cy.get(`.ant-select-selector > span input`).click();
    cy.get(`[title="${report}"]`).click();
  },
);

When(`clicks Generate button`, () => {
  cy.contains(`Generate`).click();
});

Then(`A confirmation message {string} is shown`, (message: string) => {
  cy.contains(message).should(`exist`);
});

Then(`Download button is enabled`, () => {
  cy.contains(`Download`).invoke(`attr`, `href`).should(`not.be.empty`);
});
