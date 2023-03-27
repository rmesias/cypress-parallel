import Chance from 'chance';
import {
  And,
  Given,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor';
let globalLabelName = 'name';
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

after(() => {
  cy.get(`@memberLabelID`).then((memberLabelID) => {
    if (memberLabelID !== null) {
      cy.deleteMemberLabel(
        context.access,
        Cypress.env(`backOfficeStagingGraphql`),
        memberLabelID,
      );
    }
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.checkMemberLabel(
    context.access,
    Cypress.env(`backOfficeStagingGraphql`),
    `qatest`,
  );
  cy.get(`@memberLabelID`).then((memberLabelID) => {
    if (memberLabelID !== null) {
      cy.deleteMemberLabel(
        context.access,
        Cypress.env(`backOfficeStagingGraphql`),
        memberLabelID,
      );
    }
  });

  cy.checkMemberLabel(
    context.access,
    Cypress.env(`backOfficeStagingGraphql`),
    `newlabelName`,
  );
  // cy.get(`@memberLabelID`).then((memberLabelID) => {
  //   if (memberLabelID !== null) {
  //     cy.deleteMemberLabel(
  //       context.access,
  //       Cypress.env(`boStagingGraphql`),
  //       memberLabelID,
  //     );
  //   }
  // });

  cy.visit(`/`);
  cy.get(`.date-ranges`).should(`exist`);
  cy.contains(`.ant-col ul li:nth-child(6)`, 'Members')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(3)`).click({ force: true });
  cy.get(`.ant-table-tbody`).should(`exist`);
});

Given(`a member label {string} exist`, (labelName: string) => {
  cy.createMemberLabel(
    context.access,
    Cypress.env(`backOfficeStagingGraphql`),
    labelName,
  );
  cy.reload(true);
  cy.get(`.ant-table-tbody > tr:first > td:nth-child(2)`)
    .contains(labelName)
    .should('exist')
    .and('be.visible');
});

// Scenario Outline: Verify can remove custom columns
When(`admin clicks {string} icon`, () => {
  cy.get(`.ant-table-content`).should('be.visible');
  cy.wait(1000);
  cy.get(`#columns-filter-button-member-label-management`).click();
});

When(`admin uncheck some {string}`, (list: string) => {
  // uncheck the checkbox
  cy.get(`div.ant-popover-inner`).should(`exist`).and(`be.visible`);
  cy.wait(1000);
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

//  Scenario: Creating Member label
When(`admin clicks {string} button`, (button: string) => {
  cy.contains(button).click();
});

When(
  `enters Label name {string}, choosed color and Description`,
  (labelName: string) => {
    globalLabelName = labelName;
    cy.get(`input[name='name']`).clear().type(labelName);
    cy.get(`input[name='description']`).clear().type(`QATest`);
    cy.get(
      `.twitter-picker >div:nth-child(3) >span:nth-child(${
        Math.floor(Math.random() * 26) + 1
      })`,
    ).click();
  },
);

When(`clicks Confirm button`, () => {
  cy.get(`.ant-modal-content`).should(`exist`);
  // cy.get(`.text-right .ant-btn-primary`).click();
  cy.contains(`Confirm`).click();
});

Then(`a confirmation message prompt {string}`, (message: string) => {
  cy.contains(message).should(`exist`);
});

Then(`new label is found a the top of the list`, () => {
  cy.reload();
  cy.get(`.ant-table-tbody`).should(`exist`);
  cy.get(`.ant-table-tbody> tr:first > td:nth-child(2)`).should(
    `have.text`,
    globalLabelName,
  );
});

// Scenario: Cancel creating Member label
When(`clicks {string} button`, (btn: string) => {
  cy.contains(`button`, btn).click();
});

Then(`{string} modal will be closed`, (modal: string) => {
  cy.contains(`.ant-modal-title`, modal).should('not.exist');
});

//  Scenario: Editing Member label name
When(`user clicks Edit for the member label`, () => {
  // cy.get(`.ant-table-tbody> tr:first > td:nth-child(4)`).click();
  // cy.get(`.ant-dropdown-menu-light > li:nth-child(1)`).click();
  //  cy.wait(500);
  cy.get(`.ant-table-tbody > tr:first > td:nth-child(4) > button`)
    .should('exist')
    .and('be.visible')
    .click({ force: true });

  cy.wait(500);
  cy.get(`.ant-table-tbody > tr:first > td:nth-child(4) > button`).click();

  cy.get(`div.ant-dropdown-placement-bottomRight`, { timeout: 10000 })
    .invoke('show')
    .should('exist')
    .and('be.visible')

    .then(function () {
      cy.get(`.ant-dropdown-menu-light > li:nth-child(1)`).click();
    });
});

When(`change name to {string}`, (newName: string) => {
  globalLabelName = newName;
  cy.get(`input[name='name']`).clear().type(newName);
});

Then(`edited label is found a the top of the list`, () => {
  cy.reload();
  cy.get(`.ant-table-tbody> tr:first > td:nth-child(2)`).should(
    `have.text`,
    globalLabelName,
  );
});

//  Scenario: Search Member label
When(`admin search member label name`, () => {
  cy.contains(`Enter Name`).parent().click().type(`qatest`);
  cy.get(`div[title='qatest']`).click();
});

Then(`member label should be listed and alone in the page`, () => {
  cy.get(`.ant-table-tbody> tr:first > td:nth-child(2)`).should(
    `have.text`,
    `qatest`,
  );
});

// Scenario: Clear all search
When(`click {string} filter`, (ca: string) => {
  cy.contains(`.flex-g-1 > a`, ca).click();
});

Then(`no filter on label name`, () => {
  cy.contains(`span.ant-select-selection-item-content`, 'Asia').should(
    'not.exist',
  );
});

// Save search and use quick filter
When(`admin search member label name {string}`, (labelName) => {
  cy.contains(`Enter Name`).parent().click().type(labelName);
  cy.get(`div[title='${labelName}']`).click();
});

And(`{string} link is click`, (link: string) => {
  cy.contains(`.d-flex > div > a`, link).click();
});

When(`add name for save Search`, () => {
  cy.get(`.ant-legacy-form-item-children`).type(sampleName);
  // `.ant-legacy-form > .ant-row > .ant-col-14 > .ant-legacy-form-item-control > .ant-legacy-form-item-children > .ant-input`,)
  //.eq(0)
  //.type(sampleName);
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

// Scenario: Modify search settings
When(`click Modify link`, () => {
  cy.contains(`[href='#/']`, 'Modify').click();
});

Then(`Label Name will show`, () => {
  cy.contains(`div.ant-row > .ant-col > div > div > span`, 'Label Name').should(
    'be.visible',
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
  cy.contains(`.ant-message-notice-content`, modal)
    .should(`exist`)
    .should('be.visible');
});

//  Scenario: Deleting member label
When(`user clicks Delete for the member label`, () => {
  // cy.get(`.ant-table-tbody > tr:first > td:nth-child(4)`).click();
  // cy.get(`.ant-dropdown-menu-light > li:nth-child(2)`).click();
  // cy.get(`.ant-modal-footer .ant-btn-primary`).click();
  cy.wait(500);
  cy.get(`.ant-table-tbody > tr:first > td:nth-child(4)`)
    .should('exist')
    .and('be.visible')
    .click();
  cy.get(`div.ant-dropdown-placement-bottomRight`)
    .should('exist')
    .and('be.visible')
    .invoke('show')
    .then(function () {
      cy.get(`.ant-dropdown-menu-light > li:nth-child(2)`).click();
    });
});

Then(`a modal will show {string}`, (confirmMsg) => {
  cy.contains(`.ant-modal-confirm-body`, confirmMsg)
    .should('exist')
    .and('be.visible');
});

And(`clicks confirm button`, () => {
  cy.contains(`.ant-modal-content .ant-btn-primary`, `Confirm`).click();
});

And(`a confirmation message prompt {string}`, (confirmMsg) => {
  cy.contains(`.ant-message-notice-content`, confirmMsg)
    .should(`exist`)
    .should('be.visible');
});

And(
  `member label {string} should no longer exist in the list`,
  (deletedLabel) => {
    cy.reload();
    cy.get(`.ant-table-tbody> tr:first > td:nth-child(2)`).should(
      `not.contain.text`,
      deletedLabel,
    );
  },
);

//Scenario: Click watchlist
When(`click watchlist`, () => {
  cy.get(`section > div:nth-child(1) > div > div:nth-child(1)`).click();
});

Then(`the {string} header will show`, (header: string) => {
  cy.contains(`[data-testid='container'] > section`, header).should(
    'be.visible',
  );
});
