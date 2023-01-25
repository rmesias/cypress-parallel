/// <reference types="cypress" />
import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
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

  cy.findByTitle(`Members`)
    .trigger(`mouseover`)
    .then(() => {
      cy.findByRole(`button`, { expanded: true });
      cy.findByText(`Member Reports`)
        .trigger(`mouseover`)
        .then(() => {
          cy.findByRole(`menuitem`, {
            name: `Member Access Audit History`,
          }).click({ force: true });
        });
    });
  cy.intercept(`POST`, `/graphql?totalOnlineMembersCount`).as(
    `tableLoadStatus`,
  );
});

Then(`{string} must be shown on the table`, (tab: string) => {
  cy.get(`.ant-table-thead > tr > th.ant-table-cell`).should(
    `contain.text`,
    tab,
  );
});

Then(`{string} must be shown on the left side`, (search: string) => {
  if (search === `Last Login Date Time Range`) {
    cy.findByText(search).should(`exist`);
  } else {
    cy.get(`div.d-flex.justify-content-between > div > span`).should(
      'contain.text',
      search,
    );
  }
});

Then(`Quick Filter must be shown on the left side`, () => {
  cy.get(`div.mb-1.fs-10`).should('contain.text', 'Quick Filter');
});

Then(`Registration must be shown above the ip address`, () => {
  cy.get(`div.my-2 > span.mb-1`).should('contain.text', 'Registration');
});

// Scenario: When select timezone is click
When(`admin click {string}`, (btn: string) => {
  cy.wait(`@tableLoadStatus`, { timeout: 10000 })
    .its(`response.statusCode`)
    .should(`eq`, 200);
  cy.contains(`:nth-child(3) > div > button > span`, btn).click();
});

Then(`the {string} modal will show`, (modal: string) => {
  cy.get(`.ant-modal-header > div.ant-modal-title`).should(
    'contain.text',
    modal,
  );
});

// Scenario: Verify admin can click save search button
When(`admin clicks save search button`, () => {
  cy.get(`.sidebar-shrink div.mb-3 a`).eq(0).click();
  cy.wait(`@tableLoadStatus`, { timeout: 10000 })
    .its(`response.statusCode`)
    .should(`eq`, 200);
});

Then(`admin should see save search modal`, () => {
  cy.get(`.ant-modal-content`).should('be.visible');
  cy.get(`#rcDialogTitle0`)
    .should('be.visible')
    .should('have.text', 'Save Search');
});

// Scenario: Verify admin can click search settings icon
When(`admin clicks search settings icon`, () => {
  cy.get(`span.anticon.anticon-setting`).eq(0).click();
  cy.wait(`@tableLoadStatus`, { timeout: 10000 })
    .its(`response.statusCode`)
    .should(`eq`, 200);
});

Then(`admin should see search settings icon`, () => {
  cy.get(`.ant-modal-content`).should('be.visible');
  cy.get(`div.ant-modal-title`)
    .should('be.visible')
    .should('have.text', 'Search Settings');
});

// Scenario: Verify admin can click refresh icon
When(`admin clicks refresh icon`, () => {
  cy.wait(`@tableLoadStatus`, { timeout: 10000 })
    .its(`response.statusCode`)
    .should(`eq`, 200);
  cy.intercept(`POST`, `/graphql?mahrFinalQuery`).as(`refresh`);
  cy.get(`.anticon.mr-2`).eq(0).click();
  //cy.get(`.anticon.mr-2`).eq(0).click();
});

Then(`table should be refreshed`, () => {
  cy.wait(`@refresh`).its(`response.statusCode`).should(`eq`, 200);
});

// Scenario: Verify admin can click custom columns icon
When(`admin clicks custom columns icon`, () => {
  cy.get(`.d-flex`).should('be.visible');
  cy.get(`.ant-table-container`).should('be.visible');
  cy.get(`#columns-filter-button-member-access-audit-history`).click();
});

Then(`admin should see the draggable custom columns dropdown options`, () => {
  cy.get(`.ant-popover-content`).should('be.visible');
  cy.contains(`.ant-popover-title > div`, 'Custom Columns').should(
    'be.visible',
  );
});

// Scenario: Verify admin can click download csv icon
When(`admin clicks download csv icon`, () => {
  cy.get(`span.anticon.mr-1`).eq(1).click();
  cy.wait(`@tableLoadStatus`, { timeout: 10000 })
    .its(`response.statusCode`)
    .should(`eq`, 200);
});

Then(`download csv modal will show`, () => {
  cy.get(`.ant-modal-body`).should('be.visible');
  cy.get(`.ant-btn-primary`).should('be.visible');
});
