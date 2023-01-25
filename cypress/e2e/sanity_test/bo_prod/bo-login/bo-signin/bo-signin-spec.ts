/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.visit('/');
  cy.intercept(`GET`, `/build.json`).as(`pageStatus`);
});

// Scenario: Admin input a wrong password
When(`enters wrong username and password`, () => {
  cy.url().should(`include`, '/signin');
  cy.wait(`@pageStatus`).its(`response.statusCode`).should(`eq`, 200);
  cy.wait(1000);
  cy.findByPlaceholderText(`Username`).should(`exist`).type(`randomText`);
  cy.findByPlaceholderText(`Password`).should(`exist`).type(`randomPassword`);
  cy.findByRole(`button`, { name: `Signin` }).should(`exist`).click();
});

Then(`an error message will show {string}`, (msg: string) => {
  cy.findByText(msg).should(`exist`);
});

// Scenario: Admin can signin to admin.nexuix.io
When(
  `enters username {string} and password {string}`,
  (username: string, password: string) => {
    cy.url().should(`include`, '/signin');
    cy.wait(`@pageStatus`).its(`response.statusCode`).should(`eq`, 200);
    cy.wait(1000);
    cy.findByPlaceholderText(`Username`).should(`exist`).type(username);
    cy.findByPlaceholderText(`Password`).should(`exist`).type(password);
  },
);

When(`click {string} button`, (btn: string) => {
  cy.findByRole(`button`, { name: btn }).should(`exist`).click();
});

Then(`admin will be redirected to {string}`, (page: string) => {
  cy.findByText(`adminqa1`).should(`exist`);
  cy.findByRole(`menuitem`, { name: page }).should(`exist`);
});
