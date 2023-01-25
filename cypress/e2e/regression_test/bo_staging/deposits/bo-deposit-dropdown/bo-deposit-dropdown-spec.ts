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

When(`admin click the {string} tab`, (tab: string) => {
  cy.wait(2000);
  cy.get(`:nth-child(10) > .ant-menu-submenu-title`).click({ force: true });
  cy.contains(`.ant-col ul li:nth-child(10)`, tab).click().trigger('mouseover');
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
