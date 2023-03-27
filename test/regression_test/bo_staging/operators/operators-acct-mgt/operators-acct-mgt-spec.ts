import {
  When,
  Then,
  Given,
  And,
} from '@badeball/cypress-cucumber-preprocessor';
let context: Cypress.LoginOutputs;

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
  cy.get(`.date-ranges`, { timeout: 50000 }).should(`exist`);
});

Given(`admin is on the {string} tab`, (tab: string) => {
  cy.intercept(`POST`, `/graphql?customFilters`).as(`config`);
  cy.contains(`.ant-col ul li:nth-child(4)`, 'Operators')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:first`)
    .should('contain.text', tab)
    .click({ force: true });
});

//Scenario Outline: Verify can see different tabs under Account management
Then(`{string} must be shown on the table`, (operators: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
    `contain.text`,
    operators,
  );
});

// Scenario Outline: Search row must be shown on the left side
Then(`{string} must be shown on the left side`, (search: string) => {
  cy.get(`.p-3`, { timeout: 50000 }).should('contain.text', search);
});

Then(`Quick Filter must be shown on the left side`, () => {
  cy.get(`.quick-filter-container > div.font-weight-bold`).should(
    'contain.text',
    'Quick Filter',
  );
});

// Scenario Outline: When clicking new operator the information must be shown
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn, { timeout: 30000 }).click();
});

Then(`{string} must be shown`, (info: string) => {
  cy.get(`.ant-legacy-form-item-label`).should(`contain.text`, info);
});

// Scenario: Verify admin can click save search button
When(`admin clicks save search button`, () => {
  cy.get(`div.mb-3 > div > a`, { timeout: 10000 }).eq(0).click();
});

Then(`admin should see save search modal`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Save Search');
});

// Scenario: Verify admin can click search settings icon
When(`admin clicks search settings icon`, () => {
  cy.get(`div.mb-3 > div > a`, { timeout: 10000 }).eq(1).click();
});

Then(`admin should see search settings icon`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Search Settings');
});

//Scenario: Verify admin can click custom columns icon
When(`admin clicks custom columns icon`, () => {
  cy.get(`.ant-table-tbody`).should(`be.visible`);
  cy.wait(`@config`).its(`response.statusCode`).should(`eq`, 200);
  cy.get(`#columns-filter-button-account-management`).click();
  //cy.get(`div.ant-col-12 span svg`).click;
});

Then(`admin should see the draggable custom columns dropdown options`, () => {
  cy.get(`.ant-popover-inner-content`).should('be.visible');
  cy.contains(`.ant-popover-title > div`, 'Custom Columns').should(
    'be.visible',
  );
});

//Scenario: Verify can remove custom columns
When(`admin clicks custom columns icon`, () => {
  cy.get(`.ant-table-tbody`).should(`be.visible`);
  cy.wait(`@grid`).its(`response.statusCode`).should(`eq`, 200);
  cy.get(`#columns-filter-button-account-management`).click();
});

And(`admin uncheck some {string}`, (list: string) => {
  // uncheck the checkbox
  cy.contains(`label.ant-checkbox-wrapper`, list).click();
});

And(`admin clicks {string} button`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

Then(
  `admin should see unchecked specific {string} removed`,
  (column: string) => {
    cy.contains(`th.ant-table-cell`, column).should('not.exist');
    cy.wait(500);
    cy.get(`.ant-table-tbody`).should(`be.visible`);
    cy.get(`#columns-filter-button-account-management`).click();

    cy.contains(`label.ant-checkbox-wrapper`, column).click();
    cy.contains(`button`, 'Apply').click();
    cy.contains(`th.ant-table-cell`, column).should('exist');
  },
);

//Scenario: Admin clicks the Operator Filter
When(`admin clicks operator field`, () => {
  cy.get(
    `div.ant-col.ant-legacy-form-item-control-wrapper > div > span > div > div`,
  )
    .eq(0)
    .click();
});

And(`admin clicks the first name on dropdown`, () => {
  cy.get(`.ant-select-item-option`).eq(0).click();
});

Then(`admin should see the operator info in list panel`, () => {
  cy.get(`.ant-select-selection-item-content`)
    .invoke('text')
    .then((text) => {
      cy.log(text);
      cy.get(`.ant-table-row > :nth-child(1) > a`).should('have.text', text);
    });
});

//Scenario: Admin clicks the Permission Group Filter
When(`admin clicks permission field`, () => {
  cy.get(
    `div.ant-col.ant-legacy-form-item-control-wrapper > div > span > div > div`,
  )
    .eq(2)
    .click();
});

// And(`admin clicks the first name on dropdown`, () => {
//   cy.get(`.ant-select-selection-item-content`)
//     .invoke('text')
//     .then((text) => {
//       cy.log(text);
//       cy.get(`.ant-table-row > :nth-child(2) > span`).contains(text);
//     });

//   Then(`admin should see info of that permission in list panel`, () => {
//     cy.get(`.ant-select-selection-item-content`)
//       .invoke('text')
//       .then((text) => {
//         cy.log(text);
//         cy.get(`.ant-table-row > :nth-child(1) > a`).should('have.text', text);
//       });
//   });
// });
