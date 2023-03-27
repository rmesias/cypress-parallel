/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given(`user is on the BetVision Homepage`, () => {
  cy.visit(`https://qa-staging.aonewallet.com/`, { timeout: 100000 });
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
  cy.wait(2000);
});

// Scenario: Verify user can see time options
When(`User clicks Time dropdown`, () => {
  //y.get(`ul:nth-child(2) > div:nth-child(3) > div`).eq(0).click();
  cy.get(`#timezone--list`).parent().click({ force: true });
});
Then(`User should see time options`, () => {
  cy.get(`select#timezone--list > option`).should('be.visible');
});

// Scenario: Verify user can select specific timezone
When(`User selects specific timezone`, () => {
  cy.get('#timezone--list').select('Etc/GMT-12', { force: true });
});
Then(`User should see time change`, () => {
  cy.get('#timezone--list').then(($el) => {
    const theValue = $el.val() ?? 'no value';
    cy.log(theValue.toString());
    expect($el.val(), 'option value').to.contain('Etc/GMT-12');
  });
});

// Scenario: Verify User can see the date in Betvision Homepage
When(`User is in the Betvision Homepage`, () => {
  cy.url().should(`contains`, 'https://qa-staging.aonewallet.com/');
});
Then(`User should see the date`, () => {
  //cy.get(`ul:nth-child(2) > li:nth-child(4) > p`).should('be.visible');
  cy.get(
    `[data-testid='event-bar'] ul[role='list']:nth-child(2) > li:nth-child(3) > p`,
  ).should('be.visible');
});

// Scenario: Verify User can be routed to Betvision Main Page
When(`User clicks the Betvision Logos`, () => {
  cy.get(`div.desktop > div > div > ul > a`).should('be.visible').click();
});
Then(`User should be routed to Betvision Main Page`, () => {
  cy.url().should(`contains`, 'https://qa-staging.aonewallet.com/');
  cy.get(
    `img[src='https://static-development.aonewallet.com/images/@sites/betvision/images/welcome.jpg']`,
  ).should(`be.visible`);
});

// Scenario Outline: Verify user can be routed to specific page
When(`user clicks {string}`, (img: string) => {
  cy.get(
    `ul.contact-icons img[src="https://static-development.aonewallet.com/images/@sites/betvision/images/footer/` +
      img +
      `"]`,
  )
    .parent()
    .invoke('removeAttr', 'target');
  cy.get(
    `ul.contact-icons img[src="https://static-development.aonewallet.com/images/@sites/betvision/images/footer/` +
      img +
      `"]`,
  ).click();
});

Then(`user should be routed to {string}`, (link: string) => {
  cy.url().should(`eq`, link);
});
