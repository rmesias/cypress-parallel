import {
  When,
  Then,
  Given,
  And,
} from '@badeball/cypress-cucumber-preprocessor';
let context: Cypress.LoginOutputs;
let res: Cypress.MemberOutputs;

before(() => {
  cy.boAuthentication({
    inputs: {
      credentials: Cypress.env(`boStagingCredentials`),
      site: Cypress.env(`backOfficeStagingAuthURL`),
    },
  }).then((response) => {
    context = response;
    cy.setLocalStorage(`BOaccessToken`, context.access);
    cy.setLocalStorage(`accessToken`, context.access);
    cy.setLocalStorage(`BOrefreshToken`, context.refresh);
    cy.saveLocalStorage();
    cy.queryMember({
      inputs: {
        access: context.access,
        site: Cypress.env(`backOfficeStagingGraphql`),
      },
    }).then((resp) => {
      res = resp;
    });
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.visit(`/`);
  cy.get(`.date-ranges`, { timeout: 50000 }).should(`exist`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.contains(`.ant-col ul li:nth-child(6)`, 'Members')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:first`)
    .should('contain.text', tab)
    .click({ force: true });
});

// Scenario: Remove Balance Withdrawal
When(`admin click on username`, () => {
  cy.contains(
    `[data-testid='members-table'] td.ant-table-cell > a`,
    res.username,
  ).click();
});

And(`member name will be shown on tab`, () => {
  cy.contains(
    `.ant-tabs-tab-active > div > div.d-inline-block > div`,
    `Member/${res.username}`,
  )
    .should('exist')
    .and('be.visible');
});

And(`will be redirected to member profile`, () => {
  cy.get(`h3.mb-0`).should('contain.text', res.username);
});

And(`Edit Balance is click`, () => {
  cy.get(`div.justify-content-center > span.mr-1`)
    .should(`exist`)
    .and(`be.visible`);
  cy.get(`.ant-tabs-extra-content > .ant-btn`).click();
  cy.contains(`.ant-modal-title > span`, 'Edit Balance')
    .should(`exist`)
    .and(`be.visible`);
});

And(`Remove Balance is click`, () => {
  cy.get(`:nth-child(2) > :nth-child(2) > .fs-13`).click();
});

And(`enter amount payout type`, () => {
  cy.get(`span [name='amount']`).type('20');
  cy.get(
    `[aria-label='balance-type'] > div > span.ant-select-selection-item`,
  ).click();
  cy.contains(`[aria-label="balance-type-options"]`, 'Withdrawal')
    .should(`exist`)
    .and(`be.visible`)
    .click();
});

And(`select a card`, () => {
  cy.contains(`.ant-select-selector span`, 'Select a card').click();
  cy.get(`.ant-select-dropdown`).eq(1).click();
});

And(`type remark`, () => {
  cy.get(`[aria-label='remarks']`).type('test');
});

And(`type {string}`, (pass: string) => {
  cy.get(`[name='accountPassword']`).type(pass);
});

And(`save changes and click yes`, () => {
  cy.contains(`Save changes`).click();
  cy.get(`.ant-popover-buttons button:nth-child(2)`).click();
});

Then(`admin should see error message {string}`, (message: string) => {
  cy.contains(message).should(`exist`);
});

// Scenario: Remove Balance Credit transfer
When(`admin click on username`, () => {
  cy.contains(
    `[data-testid='members-table'] td.ant-table-cell > a`,
    res.username,
  ).click();
});

And(`member name will be shown on tab`, () => {
  cy.contains(
    `.ant-tabs-tab-active > div > div.d-inline-block > div`,
    `Member/${res.username}`,
  )
    .should('exist')
    .and('be.visible');
});

And(`will be redirected to member profile`, () => {
  cy.get(`div.justify-content-center > span.mr-1`)
    .should(`exist`)
    .and(`be.visible`);
  cy.get(`h3.mb-0`).should('contain.text', res.username);
});

And(`Edit Balance is click`, () => {
  cy.get(`div.justify-content-center > span.mr-1`)
    .should(`exist`)
    .and(`be.visible`);
  cy.get(`.ant-tabs-extra-content > .ant-btn`).click();
  cy.contains(`.ant-modal-title > span`, 'Edit Balance')
    .should(`exist`)
    .and(`be.visible`);
});

And(`Remove Balance is click`, () => {
  cy.get(`:nth-child(2) > :nth-child(2) > .fs-13`).click();
});

And(`enter amount payout type`, () => {
  cy.get(`span [name='amount']`).type('20');
  cy.get(
    `[aria-label='balance-type'] > div > span.ant-select-selection-item`,
  ).click();
  cy.contains(`[aria-label="balance-type-options"]`, 'Credit transfer')
    .should(`exist`)
    .and(`be.visible`)
    .click();
});

And(`select a card`, () => {
  cy.contains(`.ant-select-selector span`, 'Select a card').click();
  cy.contains(`ant-select-item-option-content`, '3010')
    .should(`exist`)
    .and(`be.visible`);
  cy.get(`.ant-select-dropdown`).eq(1).click();
});

And(`type remark`, () => {
  cy.get(`[aria-label='remarks']`).type('test');
});

And(`type {string}`, (pass: string) => {
  cy.get(`[name='accountPassword']`).type(pass);
});

And(`save changes and click yes`, () => {
  cy.contains(`Save changes`).click();
  cy.get(`.ant-popover-buttons button:nth-child(2)`).click();
});

Then(`admin should see error message {string}`, (message: string) => {
  cy.contains(message).should(`exist`);
});

// Scenario: Remove Balance System Debit
When(`admin click on username`, () => {
  cy.contains(
    `[data-testid='members-table'] td.ant-table-cell > a`,
    res.username,
  ).click();
});

And(`member name will be shown on tab`, () => {
  cy.contains(
    `.ant-tabs-tab-active > div > div.d-inline-block > div`,
    `Member/${res.username}`,
  )
    .should('exist')
    .and('be.visible');
});

And(`will be redirected to member profile`, () => {
  cy.get(`h3.mb-0`).should('contain.text', res.username);
});

And(`Edit Balance is click`, () => {
  cy.get(`div.justify-content-center > span.mr-1`)
    .should(`exist`)
    .and(`be.visible`);
  cy.get(`.ant-tabs-extra-content > .ant-btn`).click();
  cy.contains(`.ant-modal-title > span`, 'Edit Balance')
    .should(`exist`)
    .and(`be.visible`);
});

And(`Remove Balance is click`, () => {
  cy.get(`:nth-child(2) > :nth-child(2) > .fs-13`).click();
});

And(`enter amount payout type`, () => {
  cy.get(`span [name='amount']`).type('20');
  cy.get(
    `[aria-label='balance-type'] > div > span.ant-select-selection-item`,
  ).click();
  cy.contains(`[aria-label="balance-type-options"]`, 'System Debit')
    .should(`exist`)
    .and(`be.visible`)
    .click();
});

And(`select a card`, () => {
  cy.contains(`.ant-select-selector span`, 'Select a card').click();
  cy.get(`.ant-select-dropdown`).eq(1).click();
});

And(`type remark`, () => {
  cy.get(`[aria-label='remarks']`).type('test');
});

And(`type {string}`, (pass: string) => {
  cy.get(`[name='accountPassword']`).type(pass);
});

And(`save changes and click yes`, () => {
  cy.contains(`Save changes`).click();
  cy.get(`.ant-popover-buttons button:nth-child(2)`).click();
});

Then(`admin should see error message {string}`, (message: string) => {
  cy.contains(message).should(`exist`);
});
