/* eslint-disable prettier/prettier */
/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { values } from 'cypress/types/lodash';
let context: Cypress.LoginOutputs;

before(() => {
  cy.siteAuthentication({
    inputs: {
      credentials: Cypress.env(`prodSiteCredentials`),
      site: Cypress.env(`prodAuthURL`),
      code: Cypress.env(`prodAdminCode`),
    },
  }).then((response) => {
    context = response;
    cy.setLocalStorage(`ADMIN_CODE`, Cypress.env(`prodAdminCode`));
    cy.setLocalStorage(`ACCESS_TOKEN`, context.access);
    cy.setLocalStorage(`CURRENT_ENVIRONMENT`, `production`);
    cy.saveLocalStorage();
  });
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.intercept(`POST`, `/graphql?defaultCurrency`).as(`modalStatus`);
  cy.visit(`/`);
  cy.wait(`@modalStatus`)
    .its(`response.statusCode`, { timeout: 50000 })
    .should(`eq`, 200);
});

// Scenario: Safer Gaming modal
When(`member click Safer Gaming at the profile option`, () => {
  cy.findByText(Cypress.env(`prodSiteUsername`), { selector: `p` })
    .should(`exist`)
    .click()
    .then(() => {
      cy.wait(1000);
      cy.findByText(`Personal Information`).should(`exist`);
      cy.findByRole(`button`, { name: `Safer Gaming` }).should(`exist`).click();
    });
});

Then(`Safer Gaming modal is shown`, () => {
  cy.findByText(`Safer Gaming`, { selector: `h2` }).should(`exist`).click();
});

// Scenario: Admin view Self Assessment
Given(
  `browser is at member Profile settings Safer Gaming History modal`,
  () => {
    cy.findByText(Cypress.env(`prodSiteUsername`), { selector: `p` })
      .should(`exist`)
      .click()
      .then(() => {
        cy.wait(2000);
        cy.findByText(`Personal Information`).should(`exist`);
        cy.findByRole(`button`, { name: `Safer Gaming` })
          .should(`exist`)
          .click();
      });
  },
);

When(`navigate to {string}`, (list: string) => {
  cy.findAllByText(list, { selector: `p` }).eq(0).click();
});

Then(
  `Safer Gaming {string} content fields is displayed`,
  (windowHeaders: string) => {
    cy.findByText(windowHeaders, { selector: `h2` }).should(`exist`).click();
  },
);

When(`member clicks {string}`, (saferGamingOptions: string) => {
  cy.findAllByText(saferGamingOptions, { selector: `p` }).eq(0).click();
});

// Scenario: Self Assessment
Then(`Gambling Self Assessment exist`, () => {
  cy.get(`.chakra-container > .chakra-heading`).contains(`Self Assessment`);
  cy.findByRole(`button`, { name: `Start Test` }).should(`exist`).click();
  cy.get(`p.chakra-text`).contains(`Gambling Self Assessment`);
  cy.findByRole(`button`, { name: `Start` }).should(`exist`);
});

//Scenario: Self Assessment Terms of Use
Then(`Self Assessment Terms of Use exist`, () => {
  cy.get(`.chakra-container > .chakra-heading`).contains(`Self Assessment`);
  cy.findByRole(`button`, { name: `Start Test` }).should(`exist`).click();
  cy.get(`p.chakra-text`).contains(`Gambling Self Assessment`);
  cy.get(`.chakra-text`).contains(`terms of use`).should(`exist`).click();
  cy.get(`.chakra-text`).contains(`Terms of use`).should(`exist`);
  cy.findByRole(`button`, { name: `Back` }).should(`exist`);
});

//Scenario: Self Assessment 13 Sentences Low Indicator feedback
Then(
  `Self Assessment 13, products, gambling time and Low Indicator feedback`,
  (dataTable: any) => {
    cy.get(`.chakra-container > .chakra-heading`).contains(`Self Assessment`);
    cy.findByRole(`button`, { name: `Start Test` }).should(`exist`).click();
    cy.get(`p.chakra-text`).contains(`Gambling Self Assessment`);
    cy.findByRole(`button`, { name: `Start` }).should(`exist`).click();
    const value = dataTable.hashes();
    for (let i = 0; i < value.length; i++) {
      cy.findByText(`${value[i].tablist}`, {
        selector: `p`,
        timeout: 10000,
      }).should(`exist`);
      cy.findByText(`${value[i].number}`, { selector: `p`, timeout: 10000 })
        .should(`exist`)
        .click();
      cy.findByText(`${value[i].btn}`, { selector: `button`, timeout: 10000 })
        .should(`exist`)
        .click();
    }
    cy.wait(1000);
    cy.get(`:nth-child(1) > p.chakra-text`)
      .contains(
        `You show that you keep on top of your time while gambling. Continuous use of the Reality Check facility will help manage your time.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You show that you have a good level of play by keeping to a consistent betting pattern, making informed decisions on what you bet on and controlling how much or often you gamble.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You show that you have good control of your finances. Using the Budget Calculator within the Safer Gaming section periodically will help manage your budget.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You show that your gambling is not impacting your relationships with friends, family or work, and that you are generally open with your gambling activity.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You show that your gambling has had no negative impacts on your health.`,
      )
      .should(`exist`);
  },
);

//Scenario: Self Assessment 13 Sentences Medium Indicator feedback
Then(
  `Self Assessment 13, products, gambling time and Medium Indicator feedback`,
  (dataTable: any) => {
    cy.get(`.chakra-container > .chakra-heading`).contains(`Self Assessment`);
    cy.findByRole(`button`, { name: `Start Test` }).should(`exist`).click();
    cy.get(`p.chakra-text`).contains(`Gambling Self Assessment`);
    cy.findByRole(`button`, { name: `Start` }).should(`exist`).click();
    const value = dataTable.hashes();
    for (let i = 0; i < value.length; i++) {
      cy.findByText(`${value[i].tablist}`, {
        selector: `p`,
        timeout: 10000,
      }).should(`exist`);
      cy.findByText(`${value[i].number}`, { selector: `p`, timeout: 10000 })
        .should(`exist`)
        .click();
      cy.findByText(`${value[i].btn}`, { selector: `button`, timeout: 10000 })
        .should(`exist`)
        .click();
    }
    cy.wait(1000);
    cy.get(`:nth-child(1) > p.chakra-text`)
      .contains(
        `You show that you sometimes lose track of your time when gambling. Think about making changes to your routine, the Reality Check facility will help you keep on top of your time.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You show that you sometimes have problems controlling your gameplay. Make informed decisions on what you bet on before gambling, do not chase your losses & stick to a consistent betting pattern.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You show that you sometimes lose control of your spending when gambling. Using the Budget Calculator within the Safer Gaming section and setting yourself a Deposit Limit will help keep your spending sustainable over time.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You show that gambling sometimes impacts your relationships with friends, family or work. The next section provides links to Helpful Organisations who can provide further guidance on maintaining healthy relationships.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You show that gambling has had some impact on your health. The next section provides links to Helpful Organisations and options to take breaks from gambling.`,
      )
      .should(`exist`);
  },
);

//Scenario: Self Assessment 13 Sentences High Indicator feedback
Then(
  `Self Assessment 13, products, gambling time and High Indicator feedback`,
  (dataTable: any) => {
    cy.get(`.chakra-container > .chakra-heading`).contains(`Self Assessment`);
    cy.findByRole(`button`, { name: `Start Test` }).should(`exist`).click();
    cy.get(`p.chakra-text`).contains(`Gambling Self Assessment`);
    cy.findByRole(`button`, { name: `Start` }).should(`exist`).click();
    const value = dataTable.hashes();
    for (let i = 0; i < value.length; i++) {
      cy.findByText(`${value[i].tablist}`, {
        selector: `p`,
        timeout: 10000,
      }).should(`exist`);
      cy.findByText(`${value[i].number}`, { selector: `p`, timeout: 10000 })
        .should(`exist`)
        .click();
      cy.findByText(`${value[i].btn}`, { selector: `button`, timeout: 10000 })
        .should(`exist`)
        .click();
    }
    cy.wait(1000);
    cy.get(`:nth-child(1) > p.chakra-text`)
      .contains(
        `You show that you often lose track of time when gambling. The Reality Check facility helps you keep track of your session but we’d recommend seeking assistance from one the Helpful Organisations highlighted in the next section for help changing your habits and managing your time.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You are showing signs of erratic gameplay shown in your staking patterns or the products you bet on. We’d recommend seeking assistance from one of the Helpful Organisations displayed in the next section for help changing your habits.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You show that you often lose control of your spending when gambling. We recommend not gambling until your financial situation improves and seeking help from one of the Helpful Organisations highlighted in the next section to help with your finances.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You show that gambling often impacts your relationships with friends, family and work. The next section provides links to Helpful Organisations who can provide further guidance on maintaining healthy relationships.`,
      )
      .should(`exist`);
    cy.get(`p.chakra-text`)
      .contains(
        `You show that gambling is becoming a stress and has majority impacted your health. We recommend not gambling while you are at risk of health problems and seeking help from one of the Helpful Organisations shown in the next section.`,
      )
      .should(`exist`);
  },
);

//Scenario: Self Assessment 13 Sentences Low risk
Then(
  `Self Assessment 13, products, gambling time and Low risk result`,
  (dataTable: any) => {
    cy.get(`.chakra-container > .chakra-heading`).contains(`Self Assessment`);
    cy.findByRole(`button`, { name: `Start Test` }).should(`exist`).click();
    cy.get(`p.chakra-text`).contains(`Gambling Self Assessment`);
    cy.findByRole(`button`, { name: `Start` }).should(`exist`).click();
    const value = dataTable.hashes();
    for (let i = 0; i < value.length; i++) {
      cy.findByText(`${value[i].tablist}`, {
        selector: `p`,
        timeout: 10000,
      }).should(`exist`);
      cy.findByText(`${value[i].number}`, { selector: `p`, timeout: 10000 })
        .should(`exist`)
        .click();
      cy.findByText(`${value[i].btn}`, { selector: `button`, timeout: 10000 })
        .should(`exist`)
        .click();
    }
  },
);

//Scenario: Self Assessment 13 Sentences Low-Medium risk
Then(
  `Self Assessment 13, products, gambling time and Low-Medium risk result`,
  (dataTable: any) => {
    cy.get(`.chakra-container > .chakra-heading`).contains(`Self Assessment`);
    cy.findByRole(`button`, { name: `Start Test` }).should(`exist`).click();
    cy.get(`p.chakra-text`).contains(`Gambling Self Assessment`);
    cy.findByRole(`button`, { name: `Start` }).should(`exist`).click();
    const value = dataTable.hashes();
    for (let i = 0; i < value.length; i++) {
      cy.findByText(`${value[i].tablist}`, {
        selector: `p`,
        timeout: 10000,
      }).should(`exist`);
      cy.findByText(`${value[i].number}`, { selector: `p`, timeout: 10000 })
        .should(`exist`)
        .click();
      cy.findByText(`${value[i].btn}`, { selector: `button`, timeout: 10000 })
        .should(`exist`)
        .click();
    }
  },
);

//Scenario: Self Assessment 13 Sentences Medium risk
Then(
  `Self Assessment 13, products, gambling time and Medium risk result`,
  (dataTable: any) => {
    cy.get(`.chakra-container > .chakra-heading`).contains(`Self Assessment`);
    cy.findByRole(`button`, { name: `Start Test` }).should(`exist`).click();
    cy.get(`p.chakra-text`).contains(`Gambling Self Assessment`);
    cy.findByRole(`button`, { name: `Start` }).should(`exist`).click();
    const value = dataTable.hashes();
    for (let i = 0; i < value.length; i++) {
      cy.findByText(`${value[i].tablist}`, {
        selector: `p`,
        timeout: 10000,
      }).should(`exist`);
      cy.findByText(`${value[i].number}`, { selector: `p`, timeout: 10000 })
        .should(`exist`)
        .click();
      cy.findByText(`${value[i].btn}`, { selector: `button`, timeout: 10000 })
        .should(`exist`)
        .click();
    }
  },
);

//Scenario: Self Assessment 13 Sentences Medium-High risk
Then(
  `Self Assessment 13, products, gambling time and Medium-High risk result`,
  (dataTable: any) => {
    cy.get(`.chakra-container > .chakra-heading`).contains(`Self Assessment`);
    cy.findByRole(`button`, { name: `Start Test` }).should(`exist`).click();
    cy.get(`p.chakra-text`).contains(`Gambling Self Assessment`);
    cy.findByRole(`button`, { name: `Start` }).should(`exist`).click();
    const value = dataTable.hashes();
    for (let i = 0; i < value.length; i++) {
      cy.findByText(`${value[i].tablist}`, {
        selector: `p`,
        timeout: 10000,
      }).should(`exist`);
      cy.findByText(`${value[i].number}`, { selector: `p`, timeout: 10000 })
        .should(`exist`)
        .click();
      cy.findByText(`${value[i].btn}`, { selector: `button`, timeout: 10000 })
        .should(`exist`)
        .click();
    }
  },
);

//Scenario: Self Assessment 13 Sentences High risk
Then(
  `Self Assessment 13, products, gambling time and High risk result`,
  (dataTable: any) => {
    cy.get(`.chakra-container > .chakra-heading`).contains(`Self Assessment`);
    cy.findByRole(`button`, { name: `Start Test` }).should(`exist`).click();
    cy.get(`p.chakra-text`).contains(`Gambling Self Assessment`);
    cy.findByRole(`button`, { name: `Start` }).should(`exist`).click();
    const value = dataTable.hashes();
    for (let i = 0; i < value.length; i++) {
      cy.findByText(`${value[i].tablist}`, {
        selector: `p`,
        timeout: 10000,
      }).should(`exist`);
      cy.findByText(`${value[i].number}`, { selector: `p`, timeout: 10000 })
        .should(`exist`)
        .click();
      cy.findByText(`${value[i].btn}`, { selector: `button`, timeout: 10000 })
        .should(`exist`)
        .click();
    }
  },
);

//Scenario: Self Assessment 13 Sentences very High risk
Then(
  `Self Assessment 13, products, gambling time and very High risk result`,
  (dataTable: any) => {
    cy.get(`.chakra-container > .chakra-heading`).contains(`Self Assessment`);
    cy.findByRole(`button`, { name: `Start Test` }).should(`exist`).click();
    cy.get(`p.chakra-text`).contains(`Gambling Self Assessment`);
    cy.findByRole(`button`, { name: `Start` }).should(`exist`).click();
    const value = dataTable.hashes();
    for (let i = 0; i < value.length; i++) {
      cy.findByText(`${value[i].tablist}`, {
        selector: `p`,
        timeout: 10000,
      }).should(`exist`);
      cy.findByText(`${value[i].number}`, { selector: `p`, timeout: 10000 })
        .should(`exist`)
        .click();
      cy.findByText(`${value[i].btn}`, { selector: `button`, timeout: 10000 })
        .should(`exist`)
        .click();
    }
  },
);
