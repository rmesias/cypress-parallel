/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
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

// Scenario: Bonus information modal exist
When(`member click Bonus Information at the profile option`, () => {
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Transactions`)
    .siblings(`div`)
    .children(`div:nth-child(9)`)
    .click();
});

Then(`Bonus Information modal is shown`, () => {
  cy.get(`.chakra-modal__body .chakra-heading`)
    .contains(`Bonus Information`)
    .should(`exist`);
});

//   Scenario: Bonus history
Given(`browser is at bonus information`, () => {
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Transactions`)
    .siblings(`div`)
    .children(`div:nth-child(9)`)
    .click();
});

When(`member clicks Active bonuses`, () => {
  cy.contains(`Active Bonuses`).should(`exist`).click();
});

Then(`Active Bonuses name, Amount and Date is shown`, () => {
  cy.get(`.chakra-tabs__tab-panels > div:first li`).each(($element) => {
    const text = $element.get(0).innerText;
    // console.log(text.length);
    expect(text.length).to.greaterThan(1);
    expect(text).not.NaN;
  });
});

//   Scenario: Bonus history
Given(`browser is at bonus information`, () => {
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });
  cy.contains(`Transactions`)
    .siblings(`div`)
    .children(`div:nth-child(9)`)
    .click();
});

When(`member clicks Bunos history`, () => {
  cy.contains(`Bonus History`).should(`exist`).click();
});

Then(`Bonus history empty tab shown`, () => {
  cy.get(`.chakra-heading`).contains(`Bonus Information`).should(`exist`);
  cy.get(`.chakra-alert`).contains(`No Records`).should(`exist`);
});
