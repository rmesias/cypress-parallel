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
  cy.updateConfigToDefault(
    context.access,
    Cypress.env(`backOfficeStagingGraphql`),
  );

  cy.visit(`/`);
  cy.get(`.date-ranges`).should(`exist`);
  cy.contains(`.ant-col ul li:nth-child(6)`, 'Members')
    .click({ force: true })
    .trigger('mouseover');
  cy.get(`.ant-menu-vertical li:nth-child(7)`).click({ force: true });
  cy.get(`input[name='mobileNumberReusabilityCount']`).should(`exist`);
});

When(`admin set email to Yes for can be used in multiple registrations`, () => {
  cy.get(`input[name='mobileNumberReusabilityCount']`).should(`exist`);
  cy.get(`.ant-spin-spinning`).should(`not.exist`);
  cy.contains(`.ant-form p`, `Member Management Config`).should(`exist`);
  cy.get(
    `.ant-form >div >div:nth-child(2) .ant-table-tbody td:nth-child(2) .ant-checkbox-input`,
  ).check();
});

When(`reusability count set to 10`, () => {
  cy.get(`input[name='emailReusabilityCount']`).clear().type(`10`);
  //cy.get(`.ant-btn`).click();
  cy.contains(`.ant-btn`, 'Save').click();
  cy.get(`.ant-btn-primary`).click({ force: true });
  cy.contains(`.ant-btn`, 'Save').click();
  cy.contains(`Successfully Saved Changes`).should(`exist`);
});

Then(`a confirmation message {string} is recieved`, (message: string) => {
  cy.contains(message).should(`exist`);
});

When(
  `admin set mobile number to Yes for can be used in multiple registrations`,
  () => {
    cy.get(`input[name='mobileNumberReusabilityCount']`).should(`exist`);
    cy.get(`.ant-spin-spinning`).should(`not.exist`);
    cy.contains(`.ant-form p`, `Member Management Config`).should(`exist`);
    cy.get(
      `.ant-form >div >div:nth-child(4) .ant-table-tbody td:nth-child(2) .ant-checkbox-input`,
    ).check();
  },
);

When(`reusability count set to 12`, () => {
  cy.get(`input[name='mobileNumberReusabilityCount']`).clear().type(`12`);
  //cy.get(`.ant-btn`).click({ force: true });
  cy.contains(`.ant-btn`, 'Save').click();
  cy.get(`.ant-btn-primary`).click();
  cy.contains(`Successfully Saved Changes`).should(`exist`);
});
