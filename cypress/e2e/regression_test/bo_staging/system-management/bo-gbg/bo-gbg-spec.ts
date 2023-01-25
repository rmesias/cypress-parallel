import {
  When,
  Given,
  And,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';
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
  cy.visit(`/`, { timeout: 50000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
  cy.get(`.date-ranges`, { timeout: 50000 }).should(`exist`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.contains(`.ant-col ul li:nth-child(22)`, 'System Management')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:last`)
    .should('contain.text', tab)
    .click({ force: true });
});

//Verify GBG Modal
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Enable Gbg button is click`, () => {
  cy.get('.d-flex > .ant-switch > .ant-switch-inner').click();
  cy.get('.d-flex > .ant-switch > .ant-switch-inner').click();
});

Then(`Admin click {string} button`, (modal: string) => {
  cy.contains(`button`, modal).should('contain.text', 'OK').click();
});

//Scenario: Admin enable the GBG Feature
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Enable Gbg button is click`, () => {
  cy.get('.d-flex > .ant-switch > .ant-switch-inner').click();
});

Then(
  `Admin should be able to enable GBG by clicking {string} button`,
  (modal: string) => {
    cy.contains(`button`, modal).should('contain.text', 'OK').click();
  },
);

//Scenario: Admin sets the withdrawal amount
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks {string}`, () => {
  cy.contains('If Withdrawal is greater than').click();
});

Then(`Admin clicks the {string} button`, (modal: string) => {
  cy.contains(`button`, modal).should('contain.text', 'OK').click();
});

//Scenario: Admin disables the GBG feature
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin turns off the GBG`, () => {
  cy.get('.d-flex > .ant-switch > .ant-switch-inner').click();
});

Then(`Admin click {string} button`, (modal: string) => {
  cy.contains(`button`, modal).should('contain.text', 'OK').click();
});

//Scenario: Admin sets back the GBG feature default value to enabled
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks {string}`, () => {
  cy.contains('After Successful Sign Up').click();
});

Then(`Admin click {string} button`, (modal: string) => {
  cy.contains(`button`, modal).should('contain.text', 'OK').click();
});
