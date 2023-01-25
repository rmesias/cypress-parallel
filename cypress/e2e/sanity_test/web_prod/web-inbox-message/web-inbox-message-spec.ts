/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

let context: Cypress.LoginOutputs;

before(() => {
  cy.siteAuthentication({
    inputs: {
      credentials: Cypress.env(`prodSiteCredentials`),
      site: Cypress.env(`prodAuthURL`),
      code: Cypress.env(`prodAdminCode`),
    },
  }).then((response) => {
    context = response;
    cy.setLocalStorage(`ADMIN_CODE`, Cypress.env(`prodAdminCode`));
    cy.setLocalStorage(`ACCESS_TOKEN`, context.access);
    cy.setLocalStorage(`CURRENT_ENVIRONMENT`, `production`);
    cy.saveLocalStorage();
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.intercept(`POST`, `/graphql?defaultCurrency`).as(`modalStatus`);
  cy.visit(`/`);
  cy.wait(`@modalStatus`)
    .its(`response.statusCode`, { timeout: 20000 })
    .should(`eq`, 200);
});

//  Scenario: Inbox exist at the header
Then(`{string} should exist at the header`, (inbox: string) => {
  cy.contains(inbox).should(`exist`);
});

//  Scenario: Member messages
When(`member clicks {string}`, (inbox: string) => {
  cy.contains(inbox).click();
});

Then(`message modal is shown`, () => {
  cy.contains(`Messages`).should(`exist`).parent().should(`exist`);
});

Then(`message title and is displayed`, () => {
  cy.get(`[id="message-scroll"] p`).each(($element) => {
    cy.wrap($element)
      .invoke(`prop`, `textContent`)
      .then((text) => {
        expect(text.length).to.greaterThan(0);
      });
  });
});

//  Scenario: Message formats
When(`clicks top most message`, () => {
  cy.get(`[id="message-scroll"] .chakra-accordion`)
    .eq(0)
    .should(`exist`)
    .click();
});

Then(`message content will be expanded`, () => {
  cy.get(`.chakra-accordion__button`)
    .eq(0)
    .invoke(`prop`, `ariaExpanded`)
    .then((state) => {
      expect(state).to.equal(`true`);
    });
  cy.get(`.chakra-collapse`)
    .eq(0)
    .invoke(`prop`, `clientHeight`)
    .then((state) => {
      expect(state).to.greaterThan(0);
    });
  cy.get(`.chakra-collapse >div>div>div:nth-child(1)`).eq(0).should(`exist`);
});

Then(`Trash bin icon for delete exist`, () => {
  cy.get(`.chakra-accordion__button`)
    .eq(0)
    .invoke(`prop`, `ariaExpanded`)
    .then((state) => {
      expect(state).to.equal(`true`);
    });
  cy.get(`.chakra-collapse`)
    .eq(0)
    .invoke(`prop`, `clientHeight`)
    .then((state) => {
      expect(state).to.greaterThan(0);
    });
  cy.get(`.chakra-collapse .chakra-icon`).eq(0).should(`exist`);
});
