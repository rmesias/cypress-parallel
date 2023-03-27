import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

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
});

// Scenario: Verify admin can click operators tab
When(`admin click the {string} tab`, (tab: string) => {
  cy.wait(2000);
  cy.get(`div[title='Members']`).click({ force: true });
  cy.contains(`.ant-col ul li:nth-child(6)`, tab).click().trigger('mouseover');
});

Then(`tab must be shown on the table`, (dataTable: any) => {
  const table = dataTable.hashes();
  for (let i = 0; i < table.length; i++) {
    cy.get('.ant-menu-vertical li.ant-menu-item').should(
      `contain.text`,
      table[i].value,
    );
  }
});

//
Then(
  `{string} must also be shown and contains`,
  (tab: string, dataTable: any) => {
    cy.wait(1000);
    cy.contains(`div[title='Member Reports']`, tab, {
      timeout: 30000,
    })
      .click()
      .trigger('mouseover');

    const table = dataTable.hashes();
    for (let i = 0; i < table.length; i++) {
      cy.get(`ul[id='member-reports$Menu'] > li`).should(
        `contain.text`,
        table[i].value,
      );
    }
  },
);
