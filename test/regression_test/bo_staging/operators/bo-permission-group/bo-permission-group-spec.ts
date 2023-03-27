import Chance from 'chance';
import {
  And,
  Given,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor';
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
  cy.get(`.date-ranges`).should(`exist`);
});

Given(`browser is at Permission Group page`, () => {
  cy.contains(`.ant-col ul li:nth-child(4)`, 'Operators')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:last`).click({ force: true });
});

// Scenario: Verify admin can click custom columns icon
When(`admin clicks {string} icon`, () => {
  cy.get(`.ant-table-content`).should('be.visible');
  cy.get(`#columns-filter-button-permission-group`).click();
});

Then(
  `admin should be see draggable {string} dropdown options`,
  (icon: string) => {
    cy.get(`.ant-popover-content`).should('be.visible');
    cy.contains(`.ant-popover-title > div`, icon).should('be.visible');
  },
);

// Scenario: Verify can remove custom columns
When(`admin uncheck some {string}`, (list: string) => {
  // uncheck the checkbox
  cy.contains(`label.ant-checkbox-wrapper`, list).click();
});

Then(`admin clicks {string} button`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

Then(
  `admin should see unchecked specific {string} removed`,
  (column: string) => {
    cy.contains(`th.ant-table-cell`, column).should('not.exist');
  },
);

// Scenario: verify can reset custom columns
Then(`admin clicks the {string} button`, (btn: string) => {
  cy.contains(`button`, btn).click();
  cy.contains(`button`, 'Apply').click();
});

Then(`admin should see all checkboxes options will be checked`, () => {
  cy.get(`.ant-popover-content`).should('be.visible');
});

// Scenario: Verify can close custom columns
Then(`admin should see {string} modal closed`, (col: string) => {
  cy.contains(`.ant-popover-title > div`, col).should('not.be.visible');
});

// Scenario: When download csv button is click
When(`csv button is click`, () => {
  cy.get(`.mr-2 > .mr-1 > svg`).click();
});

Then(`download csv modal will show`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
});

// Scenario: Save search on permission group
When(`click permission group and select first name`, () => {
  cy.get(
    `div.ant-col.ant-legacy-form-item-control-wrapper > div > span > div > div`,
  )
    .eq(0)
    .click();
  cy.get(`.ant-select-item-option`).eq(0).click();
});

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
  cy.get(`.quick-filter-container >div`).eq(1).click();
  cy.get(`div.rc-virtual-list-holder > div > div > div > div`).should(
    'contain.text',
    sampleName,
  );
});

// Scenario: Admin clicks the selected permission group name
When(`admin clicks permission group field`, () => {
  cy.get(
    `div.ant-col.ant-legacy-form-item-control-wrapper > div > span > div > div`,
  )
    .eq(1)
    .click();
});

When(`admin clicks the first name on dropdown`, () => {
  cy.get(`.ant-select-item-option`).eq(0).click();
});

Then(`admin should see info of that permission in list panel`, () => {
  cy.get(`.ant-select-selection-item-content`)
    .invoke('text')
    .then((text) => {
      cy.log(text);
      cy.get(`.ant-table-row > :nth-child(1) > a`).contains(text);
    });
});

// Scenario: Admin clicks the selected serial code
When(`admin clicks serial code field`, () => {
  cy.get(
    `div.ant-col.ant-legacy-form-item-control-wrapper > div > span > div > div`,
  )
    .eq(1)
    .click();
});

Then(`admin should see info of that serial code in list panel`, () => {
  cy.get(`.ant-select-selection-item-content`)
    .invoke('text')
    .then((text) => {
      cy.log(text);
      cy.get(`.ant-table-row > :nth-child(1) > a`).contains(text);
    });
});

// Scenario: Verify Permission field can see dropdown menu
When(`admin clicks permission field`, () => {
  cy.get(
    `div.ant-col.ant-legacy-form-item-control-wrapper > div > span > div > div`,
  )
    .eq(1)
    .click();
});

Then(`admin should see drop down options for that field`, () => {
  cy.get(`.rc-virtual-list-holder-inner`, { timeout: 30000 }).should(
    'be.visible',
  );
});

// Scenario: Admin selected the date time filter
When(`admin clicks date time field`, () => {
  cy.get(
    `div.ant-col.ant-legacy-form-item-control-wrapper > div > span > div > div`,
  )
    .eq(3)
    .click({ force: true });
});

And(`admin clicks start and end date`, () => {
  cy.get(
    `.sidebar-shrink .ant-picker .ant-picker-input > input[placeholder='Start Date']`,
  ).click();
  cy.get(`.ant-picker-cell-today`, { timeout: 30000 }).click();
  cy.get(
    `.sidebar-shrink .ant-picker .ant-picker-input > input[placeholder='End Date']`,
  ).click();
  cy.get(`.ant-picker-cell-today`, { timeout: 30000 }).click();

  cy.get(`.ant-table-content`).should(`exist`).and(`be.visible`);
});

Then(`admin should see list of date time filter on those date`, () => {
  cy.get(
    `.sidebar-shrink .ant-picker .ant-picker-input > input[placeholder='Start Date']`,
  )
    .invoke('val')
    .then((text) => {
      cy.get(`.ant-table-row > :nth-child(2)`, { timeout: 5000 }).should(
        'contain.text',
        text,
      );
    });
});

// Scenario: Verify that admin can create permission group
When(`user clicks 'New permission group' button`, () => {
  cy.get(`.anticon-plus`).click();
});

When(`checked all permission with name {string}`, (name: string) => {
  cy.contains(`Add New Permission Group`).should(`exist`);
  cy.createPermission(name);
});

When(`clicked Confirm`, () => {
  cy.contains(`Confirm`).click();
});

Then(`A confirmation message is received {string}`, (message: string) => {
  cy.contains(message).should(`exist`);
});

When(`user updates permission leaving only dashboard`, () => {
  cy.editPermission();
});

When(`clicked save`, () => {
  cy.get(`.ant-modal-footer .ant-btn-primary`).click();
});

When(`user clicks duplicate`, () => {
  cy.get(`tbody>tr .anticon`).eq(0).click();
  cy.get(`.ant-dropdown-menu li`).eq(1).click();
});

When(`clicks Confirms`, () => {
  cy.get(`.ant-modal-footer .ant-btn-primary`).click();
});

When(`user clicks delete`, () => {
  cy.deletePermission();
});
