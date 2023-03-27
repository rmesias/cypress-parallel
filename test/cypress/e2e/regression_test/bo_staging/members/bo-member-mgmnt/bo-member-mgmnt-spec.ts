import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
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

// Scenario: Member management - More actions
When(`{string} is click`, (btn: string) => {
  cy.contains(`button`, btn).click({ force: true });
});

Then(`dropdown consist of`, (dataTable: any) => {
  const table = dataTable.hashes();
  for (let i = 0; i < table.length; i++) {
    cy.get('ul.ant-dropdown-menu > li.ant-dropdown-menu-item > button').should(
      `contain.text`,
      table[i].value,
    );
  }
});

// Scenario: Import members on More actions
Then(`admin can see the {string} modal`, (modal: string) => {
  cy.contains(`.ant-modal-title`, modal).should('be.visible');
});

Then(`{string} button is clickable`, (btn: string) => {
  cy.contains(`button > a`, btn).should('not.be.disabled');
});

Then(`{string} is clickable`, (btn: string) => {
  cy.get(`.ant-upload-drag`).should('not.be.disabled');
});

// Scenario: Edit Balance on More actions
When(`enter member username`, () => {
  cy.get(`[id="members-involve"]`).click().type(`${res.username}{enter}`);
});

When(`enter amount payout type`, () => {
  cy.get(`span [name='amount']`).type('1');
  cy.get(
    `[aria-label='balance-type'] > div > span.ant-select-selection-item`,
  ).click();
  cy.contains(`.ant-select-item-option-content > span`, 'Payout').click();
});

When(`type {string}`, (pass: string) => {
  cy.get(`[name='accountPassword']`).type(pass);
});

When(`save changes and click yes`, () => {
  cy.contains(`Save changes`).click();
  cy.get(`.ant-popover-buttons button:nth-child(2)`).click();
});

Then(`member account contains new balance`, () => {
  const newTotal = Number(res.totalBalance) + 1;
  cy.contains('.d-flex > .mr-1', 'Success').should('be.visible');
  cy.contains(`button`, 'Done').click();
  cy.searchMember(res.username);
  cy.get(`tbody>tr .anticon-ellipsis`).eq(0).click();
  cy.get(`.account-balance-col > div`).should(
    'have.text',
    ` ${newTotal.toFixed(2)}`,
  );
});

// Scenario: Verify admin can click custom columns icon
When(`admin clicks custom columns icon`, () => {
  cy.get(`.d-flex`).should('be.visible');
  cy.get(`[data-testid="members-table"]`).should('be.visible');
  cy.wait(5000);
  cy.get(`#columns-filter-button-member-management`).click();
});

Then(`admin should see the draggable custom columns dropdown options`, () => {
  cy.get(`.ant-popover-content`).should('be.visible');
  cy.contains(`.ant-popover-title > div`, 'Custom Columns').should(
    'be.visible',
  );
});
