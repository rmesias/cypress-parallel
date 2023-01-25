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

//Scenario: Verify Reality Check Time modal
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

Then(`Admin should be able to see the Reality Check Time modal`, () => {
  cy.contains('Change Reality Check Time').should('be.visible');
});

//15 minutes
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks the 15 minutes button`, () => {
  cy.get('.ant-radio-group > :nth-child(2) > :nth-child(2)').click();
});

Then(`Admin should be able to see the Reality Check Time modal`, () => {
  cy.contains('Change Reality Check Time').should('be.visible');
});

//45 minutes
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks the 45 minutes button`, () => {
  cy.get('.ant-radio-group > :nth-child(4) > :nth-child(2)').click();
});

Then(`Admin should be able to see the Reality Check Time modal`, () => {
  cy.contains('Change Reality Check Time').should('be.visible');
});

//60 minutes
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks the 60 minutes button`, () => {
  cy.get('.ant-radio-group > :nth-child(5) > :nth-child(2)').click();
});

Then(`Admin should be able to see the Reality Check Time modal`, () => {
  cy.contains('Change Reality Check Time').should('be.visible');
});

// off button
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

And(`Admin clicks turn off button`, () => {
  cy.get('.ant-radio-group > :nth-child(1) > :nth-child(2)').click();
});

Then(`Admin should be able to see the Reality Check Time modal`, () => {
  cy.contains('Change Reality Check Time').should('be.visible');
});
