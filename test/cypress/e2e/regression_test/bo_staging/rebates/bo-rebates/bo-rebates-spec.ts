import Chance from 'chance';
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
let context: Cypress.LoginOutputs;
const chance = new Chance();

const sampleName = chance.name();

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
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.visit(`/`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.get(`.date-ranges`).should(`exist`);
  cy.contains(`.ant-col ul li:nth-child(18)`, tab)
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-table-container`).should('be.visible');
});

// Scenario: Verify can see table columns
Then(`tab must be shown on the table`, (dataTable: any) => {
  const table = dataTable.hashes();
  for (let i = 0; i < table.length; i++) {
    cy.get('th.ant-table-cell').should(`contain.text`, table[i].value);
  }
});

// Scenario: Add new rebate group
When(`{string} is click`, (btn: string) => {
  cy.contains(`button > span`, btn).click();
});

When(`add group name vip and member Marker`, () => {
  cy.get(`.ant-legacy-form-item-children > .ant-input`).type('test');
  cy.get(
    ':nth-child(3) > .ant-col-16 > .ant-legacy-form-item-control > .ant-legacy-form-item-children > :nth-child(1) > .ant-select > .ant-select-selector > .ant-select-selection-overflow',
  )
    .eq(0)
    .click();
  // cy.get(`[title='Primary Programme - VIP 03']`).click();
  cy.contains(`strong`, 'General settings').eq(0).click();
  cy.get(
    '.ant-select-danger > .ant-select > .ant-select-selector > .ant-select-selection-overflow',
  )
    .eq(0)
    .click();
  cy.get(
    `body > div:nth-child(11) > div > div > div > div.rc-virtual-list > div.rc-virtual-list-holder > div > div > div > div`,
  )
    .eq(0)
    .click();
});

When(`click {string} three times`, (btn: string) => {
  cy.contains(`button > span`, btn).click();
  cy.wait(1000);
  cy.contains(`button > span`, btn).click();
  cy.wait(1000);
  cy.contains(`button > span`, btn).click();
  cy.wait(1000);
});

Then(`message prompt shows {string}`, (msg: string) => {
  cy.get(`div.ant-message-custom-content > span:nth-child(2)`).should(
    'contain.text',
    msg,
  );
});

Then(`{string} button is click`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

// Scenario: Search rebate name
When(`user enters rebate name`, () => {
  cy.reload();
  cy.get(
    '.ant-legacy-form > :nth-child(1) > .ant-select > .ant-select-selector > .ant-select-selection-overflow',
  ).click();
  cy.get(`.rc-virtual-list-holder-inner > div:first`).click();
});

Then(`rebate name is filtered in the rebate name list`, () => {
  cy.get('.ant-table-row > :nth-child(2) > .ant-btn').should(
    `have.text`,
    'test',
  );
});

// Scenario: Save search and use quick filter
When(`{string} link is click`, (link: string) => {
  cy.contains(`.d-flex > div > a`, link).click();
});

When(`add name for save Search`, () => {
  cy.get(
    `.ant-legacy-form > .ant-row > .ant-legacy-form-item-control-wrapper > .ant-legacy-form-item-control > .ant-legacy-form-item-children > .ant-input`,
  )
    .eq(0)
    .type(sampleName);
});

When(`{string} button is click`, (btn: string) => {
  cy.contains(`button`, btn).eq(0).click();
});

Then(`title can be seen on Quick Filter field`, () => {
  cy.get(`div > span.ant-select-selection-search`).eq(0).click();
  cy.get(`div.rc-virtual-list-holder > div > div > div > div`).should(
    'contain.text',
    sampleName,
  );
});

// Scenario: Click search settings and delete existing save search
When(`settings icon is click`, () => {
  cy.get(`.anticon-setting`).click();
});

When(`click {string} link`, (del: string) => {
  cy.contains(`[href='#/section']`, del).click();
  cy.contains(`button`, 'Save changes').click();
});

Then(`{string} will show`, (modal: string) => {
  cy.contains(`.ant-modal-title`, modal).should('be.visible');
});

Then(`save search will be deleted {string}`, (msg: string) => {
  cy.contains(msg).should(`exist`);
});

// Scenario: Edit rebate group name to publish status
When(`click {string} menu item`, (btn: string) => {
  cy.get(`td:nth-child(8) > a`, { timeout: 30000 }).eq(0).click();
  cy.contains(`ul.ant-dropdown-menu > li.ant-dropdown-menu-item`, btn).click();
});

Then(`change status to Publish`, () => {
  cy.get(
    `div.ant-radio-group.ant-radio-group-outline.d-block.mb-4 > label:nth-child(1) > span.ant-radio`,
  ).click();
});

Then(`Status is set to {string}`, (sts: string) => {
  // cy.reload();
  cy.wait(2000);
  cy.get(`td:nth-child(7) > span > span.ant-badge-status-text`, {
    timeout: 30000,
  }).should('contain.text', sts);
});

When(`click {string} two times`, (btn: string) => {
  cy.contains(`button > span`, btn).click();
  cy.wait(1000);
  cy.contains(`button > span`, btn).click();
  cy.wait(1000);
});

// Scenario: click duplicate
Then(`side message prompt shows {string}`, (msg: string) => {
  cy.get(`div.ant-notification-notice-message`).should('contain.text', msg);
});

// Scenario: click continue editing
When(`side message prompt shows {string}`, (msg: string) => {
  cy.get(`div.ant-notification-notice-message`).should('contain.text', msg);
});

// Scenario: deactivate rebate name
When(`can now {string} the rebate name`, (del: string) => {
  cy.reload();
  cy.get(`td:nth-child(8) > a`, { timeout: 30000 }).eq(0).click();
  cy.contains(`ul.ant-dropdown-menu > li.ant-dropdown-menu-item`, del).click();
  cy.contains(`button`, 'Confirm').eq(0).click();
});
