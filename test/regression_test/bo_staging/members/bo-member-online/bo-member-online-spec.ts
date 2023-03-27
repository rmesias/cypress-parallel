import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
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
  cy.contains(`.ant-col ul li:nth-child(6)`, 'Members')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(4)`).click({ force: true });
});

// Scenario: Verify can see table columns
Then(`tab must be shown on the table`, (dataTable: any) => {
  const table = dataTable.hashes();
  for (let i = 0; i < table.length; i++) {
    cy.get('th.ant-table-cell').should(`contain.text`, table[i].value);
  }
});

// Scenario: Verify can see lists on Custom Columns
When(`click on custom column icon`, () => {
  cy.get(`.ant-table-content`).should('be.visible');
  cy.get(`#columns-filter-button-members-online`).click();
});

Then(`custom column list must be shown`, (dataTable: any) => {
  const table = dataTable.hashes();
  for (let i = 0; i < table.length; i++) {
    cy.get('li.list > div > label > span:nth-child(2)').should(
      `contain.text`,
      table[i].value,
    );
  }
});

// Scenario: Click watchlist
When(`click watchlist`, () => {
  cy.get(`section > div:nth-child(1) > div > div:nth-child(1)`).click();
});

Then(`the {string} header will show`, (header: string) => {
  cy.contains(`[data-testid='container'] > section`, header).should(
    'be.visible',
  );
});
