/// <reference types="cypress" />
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
    localStorage.setItem('DISABLE_ADBLOCK', 'true');
    cy.log(context.access);
    cy.updateGBG_Withdrawal(
      context.access,
      Cypress.env(`boAdminStagingGraphql`),
    );
    cy.updateMemberStatus(context.access, Cypress.env(`boAdminStagingGraphql`));
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.visit(`/`, { timeout: 100000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

after(() => {
  cy.updateGBG_Signup(context.access, Cypress.env(`boAdminStagingGraphql`));
});

When(`User logs in using new account`, () => {
  cy.contains(`Login`).click();
  cy.get(`input[placeholder='Username']`).clear().type('hellouranus');
  cy.get(`input[placeholder='Password']`)
    .clear()
    .type('password1!{enter}', { timeout: 10000 });
  // cy.contains(`.chakra-modal__body >form>button`, btnLabel).click();
});

//Verify if Newly Created User will not see Banner
Then(`user should be able to see the main page without the banner`, () => {
  cy.contains(
    `div`,
    `Before you can start betting, we are required to verify your identity. Please upload your ID and Proof of address`,
  ).should(`not.exist`);
});

// Verify if Newly Created User will be able to Deposit
When(`user clicks Deposit`, () => {
  cy.get(`button[aria-label='Profile Options'] > .chakra-text > span`, {
    timeout: 15000,
  }).click();
  cy.contains(`div[role='button']`, 'Deposit', { timeout: 30000 }).click({
    force: true,
  });
});

Then(`User should be able to see Deposit Modal`, () => {
  cy.get(`img[alt='credit-card']`, { timeout: 15000 }).should(`exist`);
});

//Verify if Newly Created User will be able to Withdraw
When(`user clicks username`, () => {
  cy.get(`button[aria-label='Profile Options'] > .chakra-text > span`, {
    timeout: 15000,
  }).click();
});

When(`user clicks Withdraw`, () => {
  cy.contains(`Withdraw`).click({ force: true });
});

Then(`User should be able to see the Withdrawal modal`, () => {
  cy.findByTestId('withdrawable-balance').should('exist');
});
