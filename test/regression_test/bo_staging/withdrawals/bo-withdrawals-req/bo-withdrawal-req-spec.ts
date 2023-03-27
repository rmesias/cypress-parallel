import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
let context: Cypress.LoginOutputs;

before(() => {
  cy.wait(1000, { timeout: 50000 });
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
  cy.queryWithdrawalMethod(
    context.access,
    Cypress.env(`backOfficeStagingGraphql`),
    `qaWithdrawalMethod`,
  );
  cy.get(`@withdrawalMethodID`).then((withdrawalMethodID) => {
    if (withdrawalMethodID !== null) {
      cy.withdrawalMethodStatus(
        context.access,
        Cypress.env(`backOfficeStagingGraphql`),
        withdrawalMethodID,
        false,
      );
      cy.deleteWithdrawalMethod(
        context.access,
        Cypress.env(`backOfficeStagingGraphql`),
        withdrawalMethodID,
      );
    }
  });

  cy.visit(`/`, { timeout: 50000 });
  cy.get(`.date-ranges`).should(`exist`);
});

//  Scenario: Admin view all members withdrawal request transaction
Given(`browser is at Withdrawal request`, () => {
  cy.get(`.date-ranges`).should(`exist`);
  cy.get(`.ant-col ul li:nth-child(12)`).click();
  cy.get('.ant-menu-vertical').should(`exist`);
  cy.wait(1000);
  cy.get('.ant-menu-vertical li:first').click();
  cy.get(`.ant-table-tbody`).should(`exist`);
});

Then(`table of users for withdrawal request are shown`, () => {
  const tableHead: string[] = [
    'Serial Code',
    'Member Account',
    'Brand ID',
    'Platform ID',
    'VIP Tier',
    'Member Marker',
    'Fee Deduction',
    'Compliance Check',
    'Withdrawal amount(£)',
    'Hexopay Transaction UID',
    'Withdrawal Sources',
    'Status',
    'Labels/Remarks',
    'Request Date / Time',
    'Elapsed Time',
    'Processing Time',
  ];
  cy.get(`.ant-table-thead`).should(`exist`);
  cy.get(`.ant-table-thead th`).each(($element, index) => {
    if (index >= 2 && index < 19) {
      if (index !== 3 && index < 4) {
        cy.wrap($element).should(`have.text`, tableHead[index - 2]);
      } else if (index !== 3) {
        cy.wrap($element).should(`have.text`, tableHead[index - 3]);
      }
    }
  });
});

//  Scenario Outline: Admin view Totals from page withdrawals
Then(
  `{string} should be shown in the buttom portion of the table`,
  (totalView: string) => {
    cy.contains(totalView)
      .siblings(`.ant-typography`)
      .invoke(`text`)
      .should(`not.be.empty`)
      .then((textValue) => {
        const textSplit = textValue.split(' ');
        const amountvalue = parseInt(textSplit[1]);
        assert.isNumber(amountvalue);
      });
  },
);

//  Scenario: Approving withdrawal request
When(`user Approved a member`, () => {
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(19)`).click();
  cy.get(`.ant-dropdown-menu li:first`).click();
});

Then(`a confirmation message {string} prompts`, (message: string) => {
  cy.contains(message, { timeout: 120000 }).should(`exist`);
});

//  Scenario: Rejecting withdrawal request
When(`user Reject a member`, () => {
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(19)`).click();
  cy.get(`.ant-dropdown-menu li:nth-child(2)`).click();
});

When(`enter remarks as {string}`, (remark: string) => {
  cy.get(`.ant-modal-content .ant-input`).clear().type(remark);
  cy.get(`.ant-modal-content .ant-modal-footer button:last`).click();
});

//Scenario: Admin can generate report list of withdrawal request
When(`user clicks download icon`, () => {
  cy.get(`.ant-layout-content .justify-content-flex-end >span`).eq(1).click();
});

When(`clicks {string} button to generate report`, (btnName: string) => {
  cy.contains(btnName).should(`exist`).click();
  cy.wait(6000);
});

//  Scenario: Withdrawal Hexopay/Manual Adjustment method
Given(`browser is at Withdrawal Method listing`, () => {
  cy.get(`.ant-col ul li:nth-child(12)`).click();
  cy.get('.ant-menu-vertical').should(`exist`);
  cy.wait(1000);
  cy.get('.ant-menu-vertical li:nth-child(2)').click();
  cy.get(`.ant-table-tbody`).should(`exist`);
});

Then(`a {string} withdrawal method exist`, (methodName: string) => {
  cy.contains(`Select a withdrawal method`).parent().click().type(methodName);
  cy.wait(1200);
  cy.get(`.ant-select-item-option-active`).click();
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(2)`).should(
    `have.text`,
    methodName,
  );
});

//  Scenario: Withdrawal Manual Adjustment action is disabled
Then(
  `action options for Manual Adjustment should be in disabled status`,
  () => {
    const options: string[] = ['Edit', 'Duplicate', 'Delete', 'Disabled'];
    cy.contains(`Select a withdrawal method`)
      .parent()
      .click()
      .type(`Manual Adjustment`);
    cy.wait(1200);
    cy.get(`.ant-select-item-option-active`).click();
    cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(9)`).should(`exist`);
    cy.reload();
    cy.wait(3000);
    cy.get(
      `.ant-table-tbody tr:nth-child(2) td.ant-table-cell-fix-right > div.ant-dropdown-trigger`,
      {
        timeout: 30000,
      },
    ).click();
    cy.get(
      `.ant-table-tbody tr:nth-child(2) td.ant-table-cell-fix-right > div.ant-dropdown-trigger`,
      {
        timeout: 30000,
      },
    ).should(`exist`);
    cy.get(
      `.ant-table-tbody tr:nth-child(2) td.ant-table-cell-fix-right > div.ant-dropdown-trigger`,
      {
        timeout: 30000,
      },
    ).click();
    cy.wait(1000);
    cy.get(`.ant-dropdown-menu-item-disabled`).each(($element, index) => {
      cy.wrap($element).should(`have.text`, options[index]);
    });
  },
);

//Scenario: Add withdrawal method error validation
When(`button {string} is click`, (btnName: string) => {
  cy.contains(btnName).click();
  cy.get(`.ant-modal-content`).should(`exist`);
});

When(`clicks "Confirm" button`, () => {
  cy.get(`.ant-modal-content .ant-btn-primary`).click();
});

Then(`fields below shows error 'Required' message:`, (nameTable: any) => {
  const nameData = nameTable.hashes();
  cy.get(`.has-error input`).each(($element, index) => {
    if (index === 1) {
      cy.wrap($element)
        .invoke(`attr`, `id`)
        .should(`eq`, nameData[index].fields);
    } else {
      cy.wrap($element)
        .invoke(`attr`, `name`)
        .should(`eq`, nameData[index].fields);
    }
  });
});

//Scenario: Create and enable withdrawal method
When(`enters following data`, (dataTable: any) => {
  const dataValue = dataTable.hashes();
  dataValue.forEach((element: any) => {
    if (element.fields === 'bankSelect') {
      cy.get(`.ant-legacy-form-item-children [id='${element.fields}']`).type(
        `${element.value}{enter}`,
      );
    } else if (element.fields === 'enabled') {
      cy.get(
        `.ant-radio-group-outline > label:nth-child(1) input[name='enabled']`,
      ).check();
    } else {
      cy.get(`[name='${element.fields}']`).clear().type(element.value);
    }
  });
});

When(`clicks {string} button`, (btnName: string) => {
  cy.contains(btnName).click();
});

Then(`{string} should be seen in the list`, (methodName: string) => {
  cy.contains(methodName).should(`exist`);
});

//  Scenario: Enable Withdrawal payment method
Given(`an existing disabled withdrawal method exist`, () => {
  const dataValue = [
    {
      fields: 'name',
      value: 'qaWithdrawalMethod',
    },
    {
      fields: 'bankSelect',
      value: 'ICBC',
    },
    {
      fields: 'accountNumber',
      value: '12345678',
    },
    {
      fields: 'accountName',
      value: 'testQA',
    },
    {
      fields: 'transactionFee',
      value: '30',
    },
    {
      fields: 'false',
      value: '2',
    },
  ];
  cy.createWithdrawalMethod(dataValue);
});

When(`user click enable`, () => {
  cy.reload();
  cy.get(`.ant-table-tbody`).should(`exist`);
  cy.contains(`Select a withdrawal method`)
    .parent()
    .click()
    .type(`qaWithdrawalMethod`);
  cy.wait(1200);
  cy.get(`.ant-select-item-option-active`).click();
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(9)`).should(`exist`);
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(9)`)
    .should(`exist`)
    .click();
  cy.get(`.ant-dropdown-menu-vertical li:last`).click();
});

When(`confirm status update`, () => {
  cy.get(`.ant-modal-content .ant-btn-primary`).click();
});

Then(`status should be {string}`, (status: string) => {
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(7)`).should(
    `include`,
    status,
  );
});

//  # Scenario: Disable Withdrawal payment method

Given(`an existing enable withdrawal method exist`, () => {
  const dataValue = [
    {
      fields: 'name',
      value: 'qaWithdrawalMethod',
    },
    {
      fields: 'bankSelect',
      value: 'ICBC',
    },
    {
      fields: 'accountNumber',
      value: '12345678',
    },
    {
      fields: 'accountName',
      value: 'testQA',
    },
    {
      fields: 'transactionFee',
      value: '30',
    },
    {
      fields: 'false',
      value: '1',
    },
  ];
  cy.createWithdrawalMethod(dataValue);
});

When(`user click disabled`, () => {
  cy.reload();
  cy.get(`.ant-table-tbody`).should(`exist`);
  cy.contains(`Select a withdrawal method`)
    .parent()
    .click()
    .type(`qaWithdrawalMethod`);
  cy.wait(1200);
  cy.get(`.ant-select-item-option-active`).click();
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(9)`).should(`exist`);
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(9)`)
    .should(`exist`)
    .click();
  cy.get(`.ant-dropdown-menu-vertical li:last`).click();
});

//  Scenario: Edit Withdrawal method
When(`user edits {string} limit settings`, () => {
  cy.reload();
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(9)`).click();
  cy.get(`.ant-dropdown-menu-vertical li:first`).should(`exist`).click();
});

When(`enters data below`, (dataTable: any) => {
  const dataValue = dataTable.hashes();
  dataValue.forEach((element: any) => {
    if (element.fields === 'enabled') {
      cy.get(
        `.ant-radio-group-outline > label:nth-child(1) input[name='enabled']`,
      ).check();
    } else {
      cy.get(`[name='${element.fields}']`).clear().type(element.value);
    }
  });
});

//Scenario: Deleting Withdrawal method
When(`user Disable {string}`, () => {
  cy.reload();
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(9)`).click();
  cy.get(`.ant-dropdown-menu-vertical li:last`).should(`exist`).click();
  cy.get(`.ant-modal-content .ant-btn-primary`).click();
});

When(`proceed to delete`, () => {
  cy.get(`.ant-table-tbody tr:nth-child(2) td:nth-child(9)`).click();
  cy.get(`.ant-dropdown-menu-vertical li:nth-child(3)`).click();
});
