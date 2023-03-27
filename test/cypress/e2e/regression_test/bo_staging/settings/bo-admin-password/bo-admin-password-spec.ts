import Chance from 'chance';
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
const chance = new Chance();

const generatePassword = (len: number) => {
  return chance.string({ length: len });
};
const randPassword = chance.string({ length: 8 });
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
  cy.contains(`Total bet amount`).should(`exist`);
  cy.intercept(`POST`, `/graphql?me`).as(`dashboardStatus`);
});

after(() => {
  cy.resetPassword(context.access, Cypress.env(`backOfficeStagingGraphql`));
});

Given(`change password form is shown`, () => {
  cy.wait('@dashboardStatus').its(`response.statusCode`).should(`eq`, 200);
  cy.get(`[data-target="profile-username"]`).should(`exist`).click();
  cy.contains(`Change Password`).should(`exist`).click();
  cy.get(`.ant-modal-content`).should(`exist`);
});

// Scenario: Admin enters incorrect current password
When(`admin enters incorrect current password`, () => {
  cy.get(`[data-testid="password-input"]`).type(generatePassword(8));
  cy.get(`[name="newPassword"]`).type(randPassword);
  cy.get(`[name="confirmNewPassword"]`).type(randPassword);
  cy.get(`[data-testid="submit-button"]`).click();
});

Then(`a confirmation pop-up message {string} is shown`, (message: string) => {
  cy.contains(message).should(`exist`);
});

Then(`a warning message {string} is shown`, (warning: string) => {
  cy.contains(warning).should(`exist`);
});

// Scenario: New Password does no match
When(`admin enters unmatch new password`, () => {
  cy.get(`[data-testid="password-input"]`).type(`password`);
  cy.get(`[name="newPassword"]`).type(generatePassword(8));
  cy.get(`[name="confirmNewPassword"]`).type(generatePassword(8));
  cy.get(`[data-testid="submit-button"]`).click();
});

//  Scenario: Password length validation
When(`admin enters three characters for new password`, () => {
  cy.get(`[data-testid="password-input"]`).type(`password`);
  cy.get(`[name="newPassword"]`).type(`pass`);
  cy.get(`[name="confirmNewPassword"]`).type(`pass`);
  cy.get(`[data-testid="submit-button"]`).click();
});

//  Scenario: empty new password validation
When(`admin leaves new passwords as empty`, () => {
  cy.get(`[data-testid="password-input"]`).type(`password`);
  cy.get(`[data-testid="submit-button"]`).click();
});

//Scenario: New password is the same from old
When(`admin enters password the same as the current`, () => {
  cy.get(`[data-testid="password-input"]`).type(`password`);
  cy.get(`[name="newPassword"]`).type(`password`);
  cy.get(`[name="confirmNewPassword"]`).type(`password`);
  cy.get(`[data-testid="submit-button"]`).click();
});

//    Scenario: Admin changing password
When(`admin change password into {string}`, (newPassword: string) => {
  cy.get(`[data-testid="password-input"]`).type(`password`);
  cy.get(`[name="newPassword"]`).type(newPassword);
  cy.get(`[name="confirmNewPassword"]`).type(newPassword);
  cy.get(`[data-testid="submit-button"]`).click();
});

Then(`admin can no longer login with the old password`, () => {
  cy.removeLocalStorage(`BOaccessToken`);
  cy.removeLocalStorage(`BOrefreshToken`);
  cy.reload();
  cy.get(`input[name='username']`)
    .clear()
    .type(Cypress.env(`boStagingUsername`));
  cy.get(`input[name='password']`).clear().type(`password`);
  cy.contains(`Signin`).click();
  cy.contains(`Invalid username or password`).should(`exist`);
});

Then(`can login with the new password`, () => {
  cy.boAuthentication({
    inputs: {
      credentials: `Basic ${Buffer.from(
        `${Cypress.env(`boStagingUsername`)}:randomPass`,
      ).toString('base64')}`,
      site: Cypress.env(`backOfficeStagingAuthURL`),
    },
  }).then((response) => {
    expect(response.access).to.exist;
  });
});
