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
  cy.updateConfig(
    context.access,
    Cypress.env(`backOfficeStagingGraphql`),
    false,
    false,
  );

  cy.visit(`/`);
  cy.get(`.date-ranges`).should(`exist`);
  cy.contains(`.ant-col ul li:nth-child(6)`, 'Members')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(5)`).click({ force: true });
});

// Scenario: Setting up all settings
When(`user set all profile settings to {string}`, (col: string) => {
  if (col === 'Hidden') {
    cy.get(
      `div[role='tabpanel'] >div label:nth-child(4) .ant-radio-inner`,
    ).each(($element) => {
      cy.wrap($element).click();
    });
  } else if (col === 'Mandatory') {
    cy.get(
      `div[role='tabpanel'] >div label:nth-child(2) .ant-radio-inner`,
    ).each(($element) => {
      cy.wrap($element).click();
    });
  } else if (col === 'Optional') {
    cy.get(
      `div[role='tabpanel'] >div label:nth-child(3) .ant-radio-inner`,
    ).each(($element) => {
      cy.wrap($element).click();
    });
  } else if (col === 'Updatable') {
    cy.get(`div[role='tabpanel'] > div > div > div:nth-child(5) button`).each(
      ($element) => {
        cy.wrap($element).click();
      },
    );
  } else if (col === 'Update Verification') {
    cy.get(`div[role='tabpanel'] > div > div  > div:nth-child(6) button`).each(
      ($element) => {
        cy.wrap($element).click({ force: true });
      },
    );
  }
});

When(`click Save button`, () => {
  cy.get(`.ant-btn-primary`).click();
});

When(`confirm Save`, () => {
  cy.get(`.ant-modal-content .ant-btn-primary`).click();
});

Then(`a confirmation message is recieved {string}`, (message: string) => {
  cy.contains(message).should(`exist`);
});

Then(`all profile settings are in {string}`, (col: string) => {
  if (col === 'Hidden') {
    cy.get(
      `div[role='tabpanel'] >div label:nth-child(4) .ant-radio-checked`,
    ).should(`have.length`, 8);
  } else if (col === 'Mandatory') {
    cy.get(
      `div[role='tabpanel'] >div label:nth-child(2) .ant-radio-checked`,
    ).should(`have.length`, 8);
  } else if (col === 'Optional') {
    cy.get(
      `div[role='tabpanel'] >div label:nth-child(3) .ant-radio-checked`,
    ).should(`have.length`, 8);
  } else if (col === 'Updatable') {
    cy.get(
      `div[role='tabpanel'] > div > div >div:nth-child(5) .ant-switch-checked`,
    ).should(`have.length`, 8);
  } else if (col === 'Update Verification') {
    cy.get(
      `div[role='tabpanel'] >div>div >div:nth-child(6) .ant-switch-checked`,
    ).should(`have.length`, 8);
  }
});
