import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

let context: Cypress.LoginOutputs;

before(() => {
  cy.wait(1000, { timeout: 50000 });
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
  cy.visit(`/`, { timeout: 50000 });
});

When(`admin click the {string} tab`, (tab: string) => {
  cy.wait(2000);
  cy.get(`div[title='Withdrawals']`).click({ force: true });
  cy.contains(`.ant-col ul li:nth-child(12)`, tab).click().trigger('mouseover');
});

Then(`tab must be shown on the table`, (dataTable: any) => {
  const table = dataTable.hashes();
  for (let i = 0; i < table.length; i++) {
    cy.get('.ant-menu-vertical li.ant-menu-item').should(
      `contain.text`,
      table[i].tab,
    );
  }
});
