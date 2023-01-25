/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.visit(`/`);
});

//  Scenario: Join button existed
When(`{string} button existed at landing page header`, (btnName: string) => {
  cy.contains(btnName).should(`exist`).should(`be.enabled`);
});

//  Scenario: Register cta existed
When(`user clicks {string}`, (btnName: string) => {
  cy.contains(btnName).click();
});
Then(`Register cta existed at login modal`, () => {
  cy.get(`.chakra-modal__header`)
    .contains(`Login`)
    .should(`exist`)
    .and(`be.visible`);
  cy.get(`p.chakra-text`)
    .contains(`Register`)
    .should(`exist`)
    .and(`be.visible`);
});

// Scenario: Verify that a validation error prompts in the first page sign-up when invalid data is entered during signup
When(`guest clicks {string} button and continue`, (btnName: string) => {
  cy.contains(btnName).click();
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
  cy.contains(btnName).click();
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
    cy.get(`input[placeholder='Enter Mobile Number']`)
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
