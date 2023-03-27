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
  cy.get(`.date-ranges`, { timeout: 50000 }).should(`exist`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.contains(`.ant-col ul li:nth-child(10)`, 'Deposits').trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(3)`)
    .should('contain.text', tab)
    .click({ force: true });
});

Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
    `contain.text`,
    tab,
  );
});

Then(`{string} must be shown on the left side`, (search: string) => {
  cy.get(`div > span`).should('contain.text', search);
});

When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

Then(`the {string} modal will show`, (modal: string) => {
  cy.get(`.ant-modal-title`).should('contain.text', modal).should('be.visible');
});

// Scenario: Verify admin can click save search button
When(`admin clicks save search button`, () => {
  cy.get(`div.mb-3 > div > a`, { timeout: 1000 }).eq(0).click();
});

Then(`admin should see save search modal`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Save Search');
});

// Scenario: Verify admin can click search settings icon
When(`admin clicks search settings icon`, () => {
  cy.get(`div.mb-3 > div > a`, { timeout: 1000 }).eq(1).click();
});

Then(`admin should see search settings icon`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Search Settings');
});

// Scenario: Verify admin can click payment methods config
When(`admin clicks payment methods config`, () => {
  cy.get(`div.mr-2`).eq(0).trigger('mouseover');
  cy.wait(500);
  cy.get('li.ant-dropdown-menu-item > div.text-left')
    .contains('Payment Methods Config')
    .click();
});

Then(`admin should see payment methods config modal`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Payment Settings');
});

// Scenario: Verify admin can click deposit source config
When(`admin clicks deposit source config`, () => {
  cy.get(`div.mr-2`).eq(0).trigger('mouseover');
  cy.wait(500);
  cy.get('li.ant-dropdown-menu-item > div.text-left')
    .contains('Deposit Source Config')
    .click();
});

Then(`admin should see deposit source config modal`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Deposit Source Config (Offline)');
});

// Scenario: Verify admin can click refresh icon
When(`admin clicks refresh icon`, () => {
  cy.get(`.d-flex`).should('be.visible');
  cy.intercept(`POST`, `/graphql?paymentMethods`).as(`refresh`);
  cy.get(`.anticon.mr-2`).eq(0).click();
  cy.get(`.anticon.mr-2`).eq(0).click();
});

Then(`table should be refreshed`, () => {
  cy.wait(`@refresh`).its(`response.statusCode`).should(`eq`, 200);
});

// Scenario: Verify admin can click custom columns icon
When(`admin clicks custom columns icon`, () => {
  cy.get(`.d-flex`).should('be.visible');
  cy.get(`[data-testid="payment-methods-table"]`).should('be.visible');
  cy.wait(5000);
  cy.get(`#columns-filter-button-payment-method-listing`).click();
});

Then(`admin should see the draggable custom columns dropdown options`, () => {
  cy.get(`.ant-popover-content`).should('be.visible');
  cy.contains(`.ant-popover-title > div`, 'Custom Columns').should(
    'be.visible',
  );
});

// Scenario: Verify admin can click download csv icon
When(`admin clicks download csv icon`, () => {
  cy.get(`span.anticon.mr-1`, { timeout: 1000 }).eq(1).click();
});

Then(`download csv modal will show`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`.ant-btn-primary`).should('be.visible');
});
