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
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.get(`.date-ranges`).should(`exist`);
  cy.contains(`.ant-col ul li:nth-child(20)`, 'Reports')
    .click({ force: true })
    .trigger('mouseover');
  cy.wait(1000);
  cy.get(`.ant-menu-vertical li:nth-child(4)`)
    .should('contain.text', tab)
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

// Scenario: Verify admin can click custom columns icon
When(`admin clicks {string} icon`, () => {
  cy.wait(1000);
  cy.get(`.ant-table-container`).should('be.visible');
  cy.get(`#columns-filter-button-rebates-reports`).click();
});

Then(
  `admin should be see draggable {string} dropdown options`,
  (icon: string) => {
    cy.wait(1000);
    cy.get(`.ant-popover-content`).should('be.visible');
    cy.contains(`.ant-popover-title > div`, icon).should('be.visible');
  },
);

// Scenario: When download csv button is click
When(`Download CSV is click`, () => {
  cy.get(`div.ant-col.ant-col-12 > div > span.anticon.mr-1`).click();
  cy.wait(1000);
});

Then(`download csv modal will show`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
});
