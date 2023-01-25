import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let context: Cypress.LoginOutputs;
let res: Cypress.MemberOutputs;

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
  //preparing initial data for the feature before starting the test.
  cy.restoreLocalStorage();
  cy.wait(1000);

  cy.visit(`/`);
  cy.get(`.date-ranges`).should(`exist`);
  cy.get(`.ant-col ul li:nth-child(6)`).click();
  cy.wait(1000);
  cy.get('.ant-menu-vertical li:first').click();
});

const valueCompare = (preVal: any, currVal: string) => {
  preVal = preVal.replace(/,/g, '');
  currVal = currVal.replace(/,/g, '');
  expect(parseInt(currVal)).is.greaterThan(parseInt(preVal));
};

//  Scenario: Admin can see Account Balance Sum is updated
// When(`member deposit {string} for Account Balance`, (amount: string) => {
//   cy.get(`span[data-testid='account-balance-sum']`).should(`exist`);
//   cy.get(`span[data-testid='account-balance-sum']`).then(($text) => {
//     const valText = $text.get(0).innerText;
//     const value = valText.split(' ');
//     cy.wrap(value[1]).as(`prevAmount`);
//   });

//   cy.memberDeposit(
//     context.access,
//     Cypress.env(`boStagingGraphql`),
//     res.id,
//     amount,
//   );
// });

// Then(`total Account balance should be updated and incremented by 10`, () => {
//   cy.reload();
//   cy.get(`span[data-testid='account-balance-sum']`).should(`exist`);
//   cy.get(`span[data-testid='account-balance-sum']`).then(($text) => {
//     const valText: string = $text.get(0).innerText;
//     const value = valText.split(' ');
//     cy.get(`@prevAmount`).should((preVal) => {
//       valueCompare(preVal, value[1]);
//     });
//   });
// });

// Admin can see Total Deposit Approved is updated
When(`member deposit {string} for Deposit Approved`, (amount: string) => {
  cy.contains(`Total Deposit Approved (£)`).siblings().should(`exist`);
  cy.contains(`Total Deposit Approved (£)`)
    .siblings()
    .then(($text) => {
      const valText = $text.get(0).innerText;
      const value = valText.split(' ');
      cy.wrap(value[1]).as(`prevAmount`);
    });
  cy.memberDeposit(
    context.access,
    Cypress.env(`boStagingGraphql`),
    res.id,
    amount,
  );
});

Then(`Total Deposit approved is updated and incremented by 10`, () => {
  cy.reload();
  cy.contains(`Total Deposit Approved (£)`).siblings().should(`exist`);
  cy.contains(`Total Deposit Approved (£)`)
    .siblings()
    .then(($text) => {
      const valText: string = $text.get(0).innerText;
      const value = valText.split(' ');
      cy.get(`@prevAmount`).should((preVal) => {
        valueCompare(preVal, value[1]);
      });
    });
});

Given(`browser is at {string} of euro wallet`, (value: string) => {
  cy.get(`.ant-tabs-nav-list  >div:nth-child(2) .d-inline-block>div`).should(
    `have.text`,
    value,
  );
});

When(`footer {string} in the footer is shown`, (value: string) => {
  cy.contains(value).siblings().should(`exist`);
});
