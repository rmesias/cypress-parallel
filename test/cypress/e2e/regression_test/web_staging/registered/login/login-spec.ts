/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.visit(`/`, { timeout: 100000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

When(
  `user enters username {string} with password {string}`,
  (username: string, password: string) => {
    cy.contains(`Login`).click();
    cy.get(`input[placeholder='Username']`).clear().type(username);
    cy.get(`input[placeholder='Password']`).clear().type(password);
  },
);

When(`clicks {string} button`, (btnLabel: string) => {
  cy.contains(`.chakra-modal__body >form>button`, btnLabel).click();
});

Then(`a confirmation message is recieved`, () => {
  cy.contains(
    `li > .chakra-toast__inner .chakra-alert__title`,
    `Successfully Authenticated`,
  );
});

Then(
  `user will be redirected to main dashboard where balance is visible`,
  () => {
    cy.get(`.chakra-container >div>div>p:nth-child(2)`).should(`exist`);
  },
);
