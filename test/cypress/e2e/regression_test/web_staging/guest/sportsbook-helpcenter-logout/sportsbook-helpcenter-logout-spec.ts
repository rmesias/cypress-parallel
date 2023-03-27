/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  // cy.setAdminCode(Cypress.env(`stagingAdminCode`));
  cy.visit(`/`);
  localStorage.setItem('DISABLE_ADBLOCK', 'true');
});

When(`user clicks sportsbook tab`, () => {
  cy.findByText('Sportsbook', { timeout: 30000 }).click();
});

Then(`user should be routed to sportsbook page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/sportsbook`);
});

When(`user clicks casino tab`, () => {
  cy.findByText('Casino', { timeout: 30000 }).click({ force: true });
});

Then(`user should be routed to casino page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/casino`);
});

When(`user clicks virtual sports tab`, () => {
  cy.findByText('Virtual Sports', { timeout: 30000 }).click();
});

Then(`user should be routed to virtual sports page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/virtual-sports`);
});

When(`user clicks safe gaming tab`, () => {
  cy.contains('Safer Gaming', { timeout: 30000 }).click({ force: true });
});

Then(`user should be routed to safe gaming page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/responsible-gambling`);
});

When(`user clicks features tab`, () => {
  cy.findByText('Features', { timeout: 30000 }).click({ force: true });
});

Then(`user should be routed to features page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/features`);
});

When(`user clicks rtp word link`, () => {
  cy.contains(`[href="/rtp"]`, `RTP`).click();
});

Then(`user should be routed to rtp page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/rtp`);
});

When(`user clicks help center word link`, () => {
  cy.contains(`[href="/help-centre"]`, `Help Centre`).click();
});

Then(`user should be routed to help center page`, () => {
  cy.url().should(`contains`, `staging.aonewallet.com/help-centre`);
});
