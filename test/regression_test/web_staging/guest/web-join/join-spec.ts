/// <reference types="cypress" />
import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { transpileModule } from 'typescript';
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
    cy.updateGBG_Signup(context.access, Cypress.env(`boAdminStagingGraphql`));
    cy.enableInterim(context.access, Cypress.env(`boAdminStagingGraphql`));
    cy.enableLoqate(context.access, Cypress.env(`boAdminStagingGraphql`));
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.visit(`/`, { timeout: 100000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

// Scenario: Guest can signup to wallet Site
When(`guest clicks {string} button and continue`, (btnName: string) => {
  cy.wait(5000);
  cy.contains(btnName, { timeout: 50000 }).click();
  cy.wait(2000);
  cy.contains(`Continue`).click();
});

When(`entered required data:`, (dataTable: any) => {
  const data = dataTable.hashes();
  cy.signupFirstPage(data);
  cy.signupSecondPage();
  cy.signupLastPage();
});

When(`click {string} button`, (btnName) => {
  cy.contains(btnName).click();
});

Then(`a confirmation message {string} prompts`, (message: string) => {
  cy.contains(message).should(`exist`);
});

// Scenario: Validation error prompts in the first page sign-up when invalid data is entered during signup
When(`clicks {string} button without inputing any data`, (btnName: string) => {
  cy.contains(btnName, { timeout: 40000 }).click();
});

Then(`warning message is shown`, (dataTable: any) => {
  const data = dataTable.hashes();
  cy.get(`.chakra-form__error-message`).each(($element, index) => {
    cy.wrap($element).should(`have.text`, data[index].warning);
  });
});

//Scenario Outline: Validation error prompts in the second page of sign-up when invalid data is entered during signup
When(`filled first page with valid data`, (dataTable: any) => {
  const data = dataTable.hashes();
  cy.signupFirstPage(data);
});

When(`supply the {string} at the second page`, (value: string) => {
  if (value) {
    cy.get(`input[placeholder='Enter Mobile Number']`, { timeout: 20000 })
      .clear({ force: true })
      .type(value, { force: true });
    cy.contains(`Next`).click();
  } else {
    cy.contains(`Next`).click();
  }
});

Then(`{string} message is shown`, (warnMsg: string) => {
  cy.contains(warnMsg).should(`exist`);
});

// Scenario Outline: Validation message "<warning>" prompts in the third page for username and password
When(`filled second page`, () => {
  cy.signupSecondPage();
});

When(`enter username {string}`, (value: string) => {
  if (value == 'Username') {
    cy.get(`input[placeholder='Username']`).focus().blur();
  } else {
    cy.get(`input[placeholder='Username']`)
      .clear({ force: true })
      .type(value, { force: true });
  }
});

Then(`{string} message is shown`, (wrnMsg: string) => {
  cy.contains(wrnMsg).should(`exist`);
});

When(`enter password {string}`, (value: string) => {
  if (value == 'Password') {
    cy.get(`input[placeholder='Password']`).focus().blur();
  } else {
    cy.get(`input[placeholder='Password']`)
      .clear({ force: true })
      .type(value, { force: true });
  }
});

When(`enter confirm username {string}`, (value: string) => {
  if (value == 'Confirm_password') {
    cy.get(`input[placeholder='Confirm Password']`).focus().blur();
  } else {
    cy.get(`input[placeholder='Confirm Password']`)
      .clear({ force: true })
      .type(value, { force: true });
  }
});

//  Scenario: Validation message "<warning>" prompts from Username, Password , Confirm password , Terms and Conditions fields
When(`warning message below is found on each fields:`, (dataTable: any) => {
  const data = dataTable.hashes();
  cy.get(`.chakra-form__error-message`).each(($element, index) => {
    cy.wrap($element).should(`contain.text`, data[index].warning);
  });
});
