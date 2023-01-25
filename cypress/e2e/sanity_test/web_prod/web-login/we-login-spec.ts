/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  // cy.setAdminCode(Cypress.env(`prodAdminCode`));
  cy.visit(`/`);
});

//Member can login to wallet site page
When(
  `member enters username {string} with password {string}`,
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
  cy.intercept(`POST`, `/graphql?getMemberBalance`).as(`balanceStatus`);
  cy.contains(
    `li > .chakra-toast__inner .chakra-alert__title`,
    `Successfully Authenticated`,
  );
});

Then(
  `member will be redirected to main dashboard where balance is visible`,
  () => {
    cy.wait('@balanceStatus').its(`response.statusCode`).should(`eq`, 200);
    cy.get(`.chakra-container >div>div>p:nth-child(2)`).should(`exist`);
    cy.getLocalStorage(`ACCESS_TOKEN`).then(($element) => {
      expect($element).to.exist;
    });
    cy.contains(`Balance:`)
      .siblings(`span`)
      .then((element) => {
        const balance = element.get(0).innerText.split(' ');
        expect(parseFloat(balance[1])).is.to.be.a(`number`);
      });
  },
);
