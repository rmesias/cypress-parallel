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

// Scenario: Member navigate to balance
When(`member click balance at the profile option`, () => {
  cy.get(`[aria-label="Profile Options"]`).should('exist');
  cy.get(`[aria-label="Profile Options"]`)
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });

  cy.contains(`Transactions`).siblings(`div`).children(`div:first`).click();
});

Then(`Balance modal is shown`, () => {
  cy.get(`.chakra-modal__body`)
    .should(`exist`)
    .find(`.chakra-heading`)
    .contains(`Balance`);
});

// Scenario: Member balance Withdrawable exist
Given(`browser is at member balance modal`, () => {
  cy.get(`[aria-label="Profile Options"]`).should('exist');
  cy.get(`[aria-label="Profile Options"]`, { timeout: 50000 })
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });

  cy.contains(`Transactions`).siblings(`div`).children(`div:first`).click();
});

Then(`withdrawable fields and amount exist`, () => {
  cy.get(`[data-testid="withdrawable-balance"]`).should((element) => {
    const balance = element.get(0).innerText.split(' ');
    expect(parseFloat(balance[1])).is.to.be.a(`number`);
  });
});

// Scenario: Member balance Bunos exist

Given(`browser is at member balance modal`, () => {
  cy.get(`[aria-label="Profile Options"]`).should('exist');
  cy.get(`[aria-label="Profile Options"]`, { timeout: 50000 })
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });

  cy.contains(`Transactions`).siblings(`div`).children(`div:first`).click();
});

Then(`bonus fields and amount exist`, () => {
  cy.get(`[data-testid="withdrawable-balance"]`)
    .parent(`div`)
    .siblings(`div`)
    .children(`p:last`)
    .should((element) => {
      const balance = element.get(0).innerText.split(' ');
      expect(parseFloat(balance[1])).is.to.be.a(`number`);
    });
});

// Scenario: Member balance Total Balance exist

Given(`browser is at member balance modal`, () => {
  cy.get(`[aria-label="Profile Options"]`).should('exist');
  cy.get(`[aria-label="Profile Options"]`, { timeout: 50000 })
    .click()
    .invoke(`prop`, `ariaExpanded`)
    .should((status) => {
      expect(status).to.deep.equal(`true`);
    });

  cy.contains(`Transactions`).siblings(`div`).children(`div:first`).click();
});

Then(`Total Balance fields and amount exist`, () => {
  cy.contains(`Total Balance`)
    .siblings(`p`)
    .should((element) => {
      const balance = element.get(0).innerText.split(' ');
      expect(parseFloat(balance[1])).is.to.be.a(`number`);
    });
});

// Scenario Outline: Member can open deposit from by clicking <label> <type>
When(`user clicks {string} {string}`, (label: string, type: string) => {
  if (type === 'button') {
    cy.contains(`.custom-scroll >div:nth-child(1) .chakra-button`, label)
      .should(`be.visible`)
      .click();
  } else if (type === 'link') {
    cy.contains(label).click();
  }
});

Then(`Deposit form is shown`, () => {
  cy.get(
    `[src="https://static-development.aonewallet.com/images/@sites/@commons/images/footer/visa.png"]`,
    { timeout: 50000 },
  )
    .should(`exist`)
    .siblings(`form`)
    .find(`[role="group"]`)
    .should(`exist`);
});

Then(`balance is also displayed`, () => {
  cy.contains(`Debit Card`)
    .siblings()
    .should((element) => {
      const balance = element.get(0).innerText.split(' ');
      balance[1] = balance[1].slice(1);
      expect(parseFloat(balance[1])).is.to.be.a(`number`);
    });
});
