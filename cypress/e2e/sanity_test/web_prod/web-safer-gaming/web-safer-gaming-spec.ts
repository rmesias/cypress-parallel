/// <reference types="cypress" />
import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import { eq } from 'cypress/types/lodash';
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

// Scenario: Header Safer Gaming exist
Then(`{string} exist in the header`, (saferGaming: string) => {
  cy.get(`[href="/responsible-gambling"]`).should(`exist`).and(`be.visible`);
});

// Scenario: Landing content contains Safer Gaming cta image link
Then(`Safer Gaming cta link image link`, () => {
  cy.get(`.best-online`).siblings(`.chakra-link`, { timeout: 20000 });
  cy.get(`.chakra-link > .chakra-image`);
});

// Scenario: Landing footer contains Safer Gaming cta link
Then(`Footer Safer Gaming cta link exist`, () => {
  cy.contains(`.chakra-heading`, `HELP`)
    .siblings(`ul`)
    .find(` li> p:first`)
    .invoke(`prop`, `innerText`)
    .should((text) => {
      expect(text).to.contain(`Safer Gaming`);
    });
});

// Scenario: Header Safer Gaming tab redirect to Safer Gaming page
When(`member clicks Safer Gaming tab`, () => {
  //cy.get(`.desktop ul>li:nth-child(5)`).click();
  cy.wait(1000);
  cy.get(`div.chakra-container ul li a[href="/responsible-gambling"]`, {
    timeout: 20000,
  }).click();
  cy.contains(`Safer Gaming`);
});

Then(`member is redirected to Safer Gaming page`, () => {
  cy.get(`[data-testid="event-bar"]`).should(`exist`).and(`be.visible`);
});

// Scenario: Landing page content Safer Gaming cta image link redirect to Safer Gaming page
When(`member clicks Safer Gaming cta image link`, () => {
  cy.wait(1000);
  cy.get(`.best-online`).siblings(`.chakra-link`, { timeout: 20000 }).click();
});

// Scenario: Landing page content footer Safer Gaming cta link redirect to Safer Gaming page
When(`member clicks footer Safer Gaming cta link`, () => {
  cy.wait(1000);
  cy.contains(`.chakra-heading`, `HELP`)
    .siblings(`ul`)
    .find(` li> p:first`)
    .click();
});

// Scenario Outline: Member navigates to Safer gaming <list>
Given(`browser is at safer gaming`, () => {
  cy.visit(`/responsible-gambling`);
});

When(`member clicks Safer gaming menu`, () => {
  cy.get(`.chakra-button__icon`)
    .siblings(`span`)
    .contains(`Safer Gaming`)
    .parent(`button`)
    .trigger(`click`)
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.equal(`true`);
    });
});

When(`clicks {string}`, (list: string) => {
  cy.get(`[data-popper-placement="bottom-start"] [role="menuitem"] p`)
    .contains(list)
    .trigger(`click`);
});

Then(`user is redirected to {string}`, (page: string) => {
  cy.url().should(`deep.equal`, page);
});

Then(
  `{string} content should be displayed with status code {int}`,
  (url: string, code: number) => {
    cy.request(url).then((response) => {
      expect(response.status).to.equal(code);
      cy.wrap(response)
        .its(`body`)
        .should('include', '<title>')
        .and('include', '</html>');
    });
  },
);

//   Scenario Outline: Member navigates to Play safe <list>
When(`member clicks Play safe menu`, () => {
  cy.get(`.chakra-button__icon`)
    .siblings(`span`)
    .contains(`Play Safe`)
    .parent(`button`)
    .trigger(`click`)
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.equal(`true`);
    });
});

// Scenario Outline: Member navigates to Support <list>
When(`member clicks Support menu`, () => {
  cy.get(`.chakra-button__icon`)
    .siblings(`span`)
    .contains(`Support`)
    .parent(`button`)
    .trigger(`click`)
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.equal(`true`);
    });
});
