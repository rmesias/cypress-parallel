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
  cy.get(`.ant-col ul li:nth-child(20)`).click();
  cy.get('.ant-menu-vertical').should(`exist`);
  cy.wait(1000);
  cy.get('.ant-menu-vertical li:nth-child(3)').click();
});

//   Scenario: Balance Transaction Records default view
Given(`browser is at Balance Transaction Records`, () => {
  cy.get(`.ant-table-thead`).should(`exist`);
  cy.get(`.ant-table-tbody`).find(`tr`).should(`have.length.above`, 1);
});

Then(`transaction records is shown`, () => {
  cy.get(`.ant-table-tbody`).find(`tr`).should(`have.length.at.least`, 2);
});

//  Scenario: Refresh records
When(`admin clicks refresh button`, () => {
  cy.intercept(`POST`, `/graphql?balanceTransactionRecords`).as(`refresh`);
  cy.get(`[data-testid="sidebarControl"]`)
    .parent()
    .find(`div:nth-child(4)`)
    .click();
  cy.wait(1000);
});

Then(`transaction records is reloaded`, () => {
  cy.wait(`@refresh`).its(`response.statusCode`).should(`eq`, 200);
});

// Scenario: Verify admin can click custom columns icon
When(`admin clicks {string} icon`, () => {
  cy.get(`.ant-table-container`).should('be.visible');
  cy.get(`#columns-filter-button-balance-transaction-records`).click();
});

Then(
  `admin should be see draggable {string} dropdown options`,
  (icon: string) => {
    cy.get(`.ant-popover-content`).should('be.visible');
    cy.contains(`.ant-popover-title > div`, icon).should('be.visible');
  },
);

// Scenario: When download csv button is click
When(`Download CSV is click`, () => {
  cy.get(`div.d-flex.my-3.px-3 > div:nth-child(7)`).click();
  cy.wait(1000);
});

Then(`download csv modal will show`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
});

// Scenario: When select timezone is click
When(`admin click {string}`, (btn: string) => {
  //cy.contains(`button > span`, btn).click();
  cy.contains(`button > span`, 'Select Timezone').click({ force: true });
});

Then(`the {string} modal will show`, (modal: string) => {
  cy.get(`.ant-modal-header > div.ant-modal-title`).should(
    'contain.text',
    modal,
  );
});
