import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.visit(`/`);
});

Then(`status code should be {int}`, (statusCode: number) => {
  cy.request(`http://admin-staging.aonewallet.com/`).then((response) => {
    expect(response.status).to.equal(statusCode);
    cy.wrap(response)
      .its(`body`)
      .should('include', '<title>')
      .and('include', '</html>');
  });
});

When(`user enters admin username`, () => {
  cy.get('div.ant-card-body').should('exist');
  cy.wait(1000);
  cy.get(`input[name='username']`)
    .clear()
    .type(Cypress.env(`boStagingUsername`));
});

When(`enters admin password`, () => {
  const pass = `password`;
  cy.get(`input[name='password']`).clear().type(pass);
});

When(`clicks {string} button`, (btnLabel: string) => {
  cy.contains(btnLabel).click();
});

Then(`user is redirected to admin {string}`, (value: string) => {
  cy.contains(Cypress.env(`boStagingUsername`)).should(`exist`);
  cy.get(`.ant-menu-horizontal`).children().eq(1).should(`have.text`, value);
});

When(`user enters admin username {string}`, (username: string) => {
  cy.get('div.ant-card-body').should('exist');
  cy.wait(1000);
  cy.get(`input[name='username']`).clear().type(username);
});

When(`enters admin password {string}`, (password: string) => {
  cy.get(`input[name='password']`).clear().type(password);
});

Then(`user recieves error message {string}`, (value: string) => {
  cy.get(`.ant-message-error`).should(`have.text`, value);
});
