/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
let context: Cypress.LoginOutputs;

before(() => {
  if (Cypress.config('baseUrl') === 'https://qa-staging.aonewallet.com/') {
    cy.siteAuthentication({
      inputs: {
        credentials: Cypress.env(`authtest`),
        site: Cypress.env(`siteStagingAuthURL`),
        code: Cypress.env(`stagingAdminCode`),
      },
    }).then((response) => {
      context = response;
      cy.setLocalStorage(`ADMIN_CODE`, Cypress.env(`stagingAdminCode`));
      cy.setLocalStorage(`ACCESS_TOKEN`, context.access);
      cy.setLocalStorage(`CURRENT_ENVIRONMENT`, `Staging`);
      cy.saveLocalStorage();
      localStorage.setItem('DISABLE_ADBLOCK', 'true');
    });
  } else {
    cy.siteAuthentication({
      inputs: {
        credentials: Cypress.env(`authtrans`),
        site: Cypress.env(`siteStagingAuthURL`),
        code: Cypress.env(`stagingAdminCode`),
      },
    }).then((response) => {
      context = response;
      cy.setLocalStorage(`ADMIN_CODE`, Cypress.env(`stagingAdminCode`));
      cy.setLocalStorage(`ACCESS_TOKEN`, context.access);
      cy.setLocalStorage(`CURRENT_ENVIRONMENT`, `Staging`);
      cy.saveLocalStorage();
      localStorage.setItem('DISABLE_ADBLOCK', 'true');
    });
  }
});

Given(`user is logged-in in the BetVision Homepage`, () => {
  cy.restoreLocalStorage();
  cy.visit(`/`);
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

// Scenario: Verify user can see time options
When(`User clicks Time dropdown`, () => {
  //cy.get(`ul:nth-child(2) > div:nth-child(3) > div`).eq(0).click();
  cy.get(`#timezone--list`).parent().click({ force: true });
});
Then(`User should see time options`, () => {
  cy.get(`select#timezone--list > option`).should(`be.visible`);
});

// Scenario: Verify user can select specific timezone
When(`User selects specific timezone`, () => {
  cy.get(`#timezone--list`).select(`Etc/GMT-12`, { force: true });
});
Then(`User should see time change`, () => {
  cy.get(`#timezone--list`).then(($el) => {
    const theValue = $el.val() ?? `no value`;
    cy.log(theValue.toString());
    expect($el.val(), `option value`).to.contain(`Etc/GMT-12`);
  });
});

// Scenario: Verify User can see the date in Betvision Homepage
When(`User is in the Betvision Homepage`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/`);
});
Then(`User should see the date`, () => {
  //cy.get(`ul:nth-child(2) > li:nth-child(4) > p`).should(`be.visible`);
  cy.get(
    `[data-testid='event-bar'] ul[role='list']:nth-child(2) > li:nth-child(3) > p`,
  ).should('be.visible');
});

// Scenario: Verify User can be routed to Betvision Main Page
When(`User clicks the Betvision Logo`, () => {
  cy.get(`div.desktop > div > div > ul > a`);
  cy.get(`.chakra-image`).should(`be.visible`);
});
Then(`User should be routed to Betvision Main Page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/`);
  cy.get(
    `img[src="https://static-development.aonewallet.com/images/@sites/betvision/images/welcome.jpg"]`,
  ).should(`be.visible`);
});

// Scenario Outline: Verify user can be routed to specific page
When(`user clicks {string}`, (img: string) => {
  cy.get(
    `ul.contact-icons img[src="https://static-development.aonewallet.com/images/@sites/betvision/images/footer/${img}"]`,
  )
    .parent()
    .invoke(`removeAttr`, `target`)
    .click();
});

Then(`user should be routed to {string}`, (link: string) => {
  cy.url().should(`contains`, link);
});
