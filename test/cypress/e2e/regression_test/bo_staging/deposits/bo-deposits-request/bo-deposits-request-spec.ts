import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

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
  cy.get(`.date-ranges`).should(`exist`);
});
//  Scenario: Admin view all members deposit transaction
Given(`browser is at Deposit request Internal`, () => {
  cy.get(`.ant-col ul li:nth-child(10)`).click();
  cy.get('.ant-menu-vertical').should(`exist`);
  cy.get('.ant-menu-vertical li:first').click();
  cy.get(`.ant-table-tbody`).should(`exist`);
});

Then(`table of users for deposit request are shown`, () => {
  const tableHead: string[] = [
    'Serial Code',
    'Affiliate',
    'Account Username',
    'Platform ID',
    'Brand ID',
    'Affiliate ID',
    'VIP Tier',
    'Member Marker',
    'Payment Method',
    'Hexopay Transaction UID',
    'Payment Account Number',
    'Amount(£)',
    'Status',
    'Labels/Remarks',
    'Request Date / Time',
    'Processing Time',
    'Actions',
  ];
  cy.get(`.ant-table-thead`).should(`exist`);
  cy.get(`.ant-table-thead th`).each(($element, index) => {
    if (index >= 2 && index < 19) {
      cy.wrap($element).should(`have.text`, tableHead[index - 2]);
    }
  });
});
// Scenario: Payment deposit Hexopay and Manual Adjustment method
Given(`browser is at Payment Method listing`, () => {
  cy.get(`.ant-col ul li:nth-child(10)`).click();
  cy.contains('Payment Method Listing').click({ force: true });
  // cy.get(`.ant-table-tbody`).should(`exist`);
});

Then(`a {string} payment method exist`, (paymentMethod: string) => {
  cy.contains(paymentMethod).should(`exist`);
});
//  Scenario: Payment deposit Manual Adjustment action is disabled
When(
  `action options for Manual Adjustment should be in disabled status`,
  () => {
    cy.get(`.ant-table-tbody tr:nth-child(3) td:nth-child(11) >div`).should(
      `not.be.enabled`,
    );
  },
);

//Scenario: Add deposit method error validation
When(`button {string} is click`, (createBtn: string) => {
  cy.contains(createBtn).should(`exist`).click();
  cy.get(`.ant-modal-content`).should(`exist`);
});

When(`clicks {string} button`, (submitForm: string) => {
  cy.contains(submitForm).should(`exist`).click();
});

Then(`fields below shows error 'Required' message:`, (idTable: any) => {
  const idData = idTable.hashes();
  cy.get(`.has-error input`).each(($element, index) => {
    if (index === 5) {
      cy.wrap($element)
        .invoke(`attr`, `name`)
        .should(`eq`, idData[index].fields);
    } else {
      cy.wrap($element).invoke(`attr`, `id`).should(`eq`, idData[index].fields);
    }
  });
});

//  Scenario: Add and enable deposit method
When(`enters following data`, (dataTable: any) => {
  const arrDataTable = dataTable.hashes();

  arrDataTable.forEach((element: any, index: any) => {
    if (index === 1) {
      cy.get(`.ant-legacy-form-item-children [id='${element.fields}']`).type(
        `${element.value}{enter}`,
      );
    } else if (index === 5) {
      cy.get(`[name='${element.fields}']`).clear().type(element.value);
    } else {
      cy.get(`[id='${element.fields}']`).clear().type(element.value);
    }
  });
});

Then(`a confirmation message {string} prompts`, (confMsg: string) => {
  cy.contains(confMsg).should(`exist`);
});

Then(`{string} should be seen in the list`, (payMethodName: string) => {
  cy.contains(`Enter Name`).parent().click().type(`${payMethodName}`);
  cy.get(`div[title='${payMethodName}']`).click();
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(2)`).should(
    `have.text`,
    payMethodName,
  );
});

//  Scenario: Enable deposit payment method
When(`a disabled payment method exist`, () => {
  cy.createPaymentMethod(
    context.access,
    Cypress.env(`boStagingGraphql`),
    false,
  );
  cy.reload();
});

When(`user click enable`, () => {
  cy.contains(`Enter Name`).parent().click().type(`qaPaymentMethod`);
  cy.get(`div[title='qaPaymentMethod']`).click();
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(11)`).click();
  cy.get(`.ant-dropdown-menu li:nth-child(4)`).click();
  cy.get(`.ant-modal-content .ant-btn-primary`).click();
});

Then(`status should be {string}`, (status: string) => {
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(9)`).should(
    `contain.text`,
    status,
  );
});

//  Scenario: Edit deposit method
Given(`a payment method exist`, () => {
  cy.createPaymentMethod(context.access, Cypress.env(`boStagingGraphql`), true);
  cy.reload();
});

When(`user edits {string} limit settings`, (payMethodName: string) => {
  cy.contains(`Enter Name`).parent().click().type(payMethodName);
  cy.get(`div[title='${payMethodName}']`).click();
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(11)`).click();
  cy.get(`.ant-dropdown-menu li:nth-child(1)`).click();
});

When(`enters data below`, (dataTable: any) => {
  const arrDataTable = dataTable.hashes();
  arrDataTable.forEach((element: any, index: any) => {
    if (index === 1) {
      cy.get(`[name='${element.fields}']`).clear().type(element.value);
    } else {
      cy.get(`[id='${element.fields}']`).clear().type(element.value);
    }
  });
});

// Scenario: Deleting deposit method
When(`user Disabled {string}`, (payMethodName: string) => {
  cy.contains(`Enter Name`).parent().click().type(payMethodName);
  cy.get(`div[title='${payMethodName}']`).click();
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(11)`).click();
  cy.get(`.ant-dropdown-menu li:nth-child(4)`).click();
  cy.get(`.ant-modal-content .ant-btn-primary`).click();
  cy.contains(`Successfully saved changes`).should(`exist`);
});

When(`proceed to delete`, () => {
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(11)`).click();
  cy.get(`.ant-dropdown-menu li:nth-child(3)`).click();
  cy.get(`.ant-modal-content .ant-btn-primary`).click();
});
