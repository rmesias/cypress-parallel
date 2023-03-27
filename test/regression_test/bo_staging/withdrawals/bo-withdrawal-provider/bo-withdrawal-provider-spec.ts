import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
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
  cy.visit(`/`, { timeout: 10000 });
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.get(`.date-ranges`).should(`exist`);
  cy.get(`div[title='Withdrawals']`, { timeout: 1000 }).click({ force: true });
  cy.get(`.ant-menu-vertical li:nth-child(3)`)
    .contains(tab)
    .click({ force: true });
  cy.get(`.ant-table-container`).should('be.visible');
});

// Scenario: Verify can see table columns
Then(`tab must be shown on the table`, (dataTable: any) => {
  const table = dataTable.hashes();
  for (let i = 0; i < table.length; i++) {
    cy.get('th.ant-table-cell').should(`contain.text`, table[i].value);
  }
});

// Scenario: When download csv button is click
When(`Download CSV is click`, () => {
  cy.wait(2000);
  cy.get(`div.mr-2 > .anticon > svg`, { timeout: 1000 })
    .should('exist')
    .click();
});

Then(`download csv modal will show`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
});

// Scenario: When Add withdrawal provider is click
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).should('exist').click();
});

Then(`{string} modal will show`, (modal: string) => {
  cy.contains(`.ant-modal-title`, modal).should('be.visible');
});
