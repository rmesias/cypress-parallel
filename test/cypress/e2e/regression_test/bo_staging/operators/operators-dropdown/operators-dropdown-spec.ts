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
});

// Scenario: Verify admin can click operators tab
When(`admin click the {string} tab`, (tab: string) => {
  cy.wait(1000);
  cy.get(`div[title='Operators']`).click({ force: true });
  cy.contains(`.ant-col ul li:nth-child(4)`, tab).click().trigger('mouseover');
});

Then(`admin can see the {string} and {string}`, (am: string, pg: string) => {
  cy.get(`.ant-menu-vertical li`)
    .eq(0)
    .should('contain.text', am)
    .should('be.visible');
  cy.get(`.ant-menu-vertical li`)
    .eq(1)
    .should('contain.text', pg)
    .should('be.visible');
});
