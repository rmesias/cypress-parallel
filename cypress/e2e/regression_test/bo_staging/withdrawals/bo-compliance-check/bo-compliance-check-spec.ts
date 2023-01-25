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
  cy.contains(`.ant-col ul li:nth-child(12)`, 'Withdrawals')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(4)`)
    .should('contain.text', tab)
    .click({ force: true });
});

Then(`{string} is there`, (text: string) => {
  cy.get(`span.ant-legacy-form-item-children > strong`)
    .should(`contain.text`, text)
    .should('be.visible');
});

Then(`the status toggle button is {string}`, (toggle: string) => {
  cy.get(`button[name='enabled'] > span.ant-switch-inner`).should(
    'contain.text',
    toggle,
  );
});

Then(`the enable toggle button says {string}`, (toggle: string) => {
  cy.get(
    `button[name='turnoverRequirementEnabled'] > span.ant-switch-inner`,
  ).should('contain.text', toggle);
});
