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
  cy.queryPromoLabel({
    queryInput: [
      {
        access: context.access,
        site: Cypress.env(`backOfficeStagingGraphql`),
        labelName: `QALabel`,
      },
      {
        access: context.access,
        site: Cypress.env(`backOfficeStagingGraphql`),
        labelName: `QARename`,
      },
    ],
  });
  cy.visit(`/`);
  cy.wait(2000);
  cy.get(`.date-ranges`).should(`exist`);
  cy.get(`.ant-col ul li:nth-child(14)`).click();
  cy.get('.ant-menu-vertical').should(`exist`);
  cy.wait(1000);
  cy.get('.ant-menu-vertical li:last').click();
  cy.get(`.ant-table-tbody`).should(`exist`);
});

const search = (name: string) => {
  cy.get(`.ant-select-selection-overflow`).should(`exist`).click();
  cy.get(`[title="${name}"]`).click();
};

// Scenario: View list of Promo labels
Then(`all promo label is shown in the page`, () => {
  cy.get(`.ant-table-tbody`).find(`tr`).should(`have.length.above`, 0);
});

// Scenario: Create Promo label
Given(`create Promo label form is shown`, () => {
  cy.contains(`Create New Promo Label`).should(`exist`).click();
  cy.get(`.ant-modal-content`).should(`exist`);
});

When(`admin adds promo name {string}`, (labelName: string) => {
  cy.get(`[name="name"]`).should(`exist`).clear().type(labelName);
});

When(`selects BLUE color`, () => {
  cy.get(`.ant-modal-content [type="search"]`).click();
  cy.get(`.rc-virtual-list-holder-inner > div:nth-child(3)`)
    .should(`exist`)
    .click();
});

When(`clicks submit button`, () => {
  cy.get(`.ant-modal-content .ant-btn-primary`).click();
});

Then(`a confirmation message {string} is shown`, (message: string) => {
  cy.contains(message).should(`exist`);
});

Then(`{string} should be listed in the table`, (labelName: string) => {
  cy.reload();
  cy.contains(labelName).should(`exist`);
});

//Scenario: Edit Promo label
Given(`promo label {string} exist`, (labelName: string) => {
  cy.createPromoLabel(
    context.access,
    Cypress.env(`backOfficeStagingGraphql`),
    labelName,
    `BLUE`,
  );

  cy.visit(`/`);
});

When(`user edits promo label {string}`, (labelName: string) => {
  search(`QALabel`);
  cy.get(`.ant-table-tbody tr:nth-child(1)>td:nth-child(5)`)
    .should(`exist`)
    .click();
  cy.contains(`Edit`).should(`exist`).click();
  cy.get(`[name="name"]`).should(`exist`).clear().type(labelName);
});

When(`change color into RED`, () => {
  cy.get(`.ant-modal-content .ant-select-selector`).should(`exist`).click();
  cy.get(`.rc-virtual-list-holder-inner > div:last`).should(`exist`).click();
  cy.get(`.ant-modal-content .ant-btn-primary`).click();
});

Then(
  `{string} now exist in the table replacing {string}`,
  (newLabelName: string, OldLabelName: string) => {
    cy.reload();
    cy.contains(newLabelName).should(`exist`);
    cy.contains(OldLabelName).should(`not.exist`);
  },
);

//Scenario: Delete Promo label

When(`user deletes Promo label`, () => {
  search(`QALabel`);
  cy.get(`.ant-table-tbody tr:nth-child(1)>td:nth-child(5)`)
    .should(`exist`)
    .click();
  cy.contains(`Delete`).should(`exist`).click();
  cy.get(`.ant-modal-content .ant-btn-dangerous`).should(`exist`).click();
});

Then(
  `{string} should no longer be listed in the table`,
  (labelName: string) => {
    cy.reload();
    cy.contains(labelName).should(`not.exist`);
  },
);
