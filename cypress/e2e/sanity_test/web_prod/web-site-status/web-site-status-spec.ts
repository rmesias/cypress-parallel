/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

//  Scenario: Make an XHR request for url: https://qa.nexiux.io/#/
Then(`status code should be {int}`, (statusCode: number) => {
  cy.request(`https://qa.nexiux.io/`).then((response) => {
    expect(response.status).to.equal(statusCode);
    cy.wrap(response)
      .its(`body`)
      .should('include', '<head>')
      .and('include', '</html>');
  });
});

//Scenario: Browsed wallet site url: https://qa.nexiux.io/#/
When(`user browsed wallet WEB url: {string}`, (url: string) => {
  cy.visit(url);
});

Then(`header tabs and button should exist:`, (navTable: any) => {
  const navNames = navTable.hashes();
  cy.get(`.desktop ul[role='list'] >li`).each((element, index) => {
    cy.wrap(element).should(`contain.text`, navNames[index].navigationTabs);
  });
});

Then(`{string} and {string} exist`, (join: string, login: string) => {
  cy.contains(join).should(`exist`);
  cy.contains(login).should(`exist`);
});

Then(`body CTA should exist`, (ctaTable: any) => {
  const ctaNames = ctaTable.hashes();
  cy.get(`.best-online [role="list"] h5`).each((element, index) => {
    cy.wrap(element).should(`contain.text`, ctaNames[index].cta);
  });
  cy.get(`.best-online [role="list"] button`).each((element, index) => {
    cy.wrap(element).should(`have.text`, ctaNames[index].btn);
  });
});
