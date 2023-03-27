// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import '@testing-library/cypress/add-commands';
import 'cypress-localstorage-commands';
import 'cypress-file-upload';
import Chance from 'chance';

const chance = new Chance();

const generateString = (len: number) => {
  const randomText = chance.string({
    length: len,
    pool: 'abcdef123456789',
  });
  return randomText;
};

const generateNumbers = (len: number) => {
  const randomInt = chance.string({ length: len, pool: '123456789' });
  return randomInt;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      setAdminCode(code: string): void;
    }

    interface Chainable<Subject> {
      checkDetails(value: any): void;
    }
    interface Chainable<Subject> {
      navTo(num: number): void;
    }

    interface Chainable<Subject> {
      passwordReset(access: any, code: string, site: string): void;
    }
    interface Chainable<Subject> {
      deleteMemberDocs(
        deleteQuery: string,
        access: any,
        code: string,
        site: string,
      ): void;
    }
    interface Chainable<Subject> {
      checkMemberDocs(access: any, code: string, site: string): void;
    }
    interface Chainable<Subject> {
      fileList(value: any): void;
    }

    interface Chainable<Subject> {
      signupFirstPage(data: any): void;
    }

    interface Chainable<Subject> {
      signupSecondPage(): void;
    }

    interface Chainable<Subject> {
      signupLastPage(): void;
    }

    interface Chainable<Subject> {
      createMember(code: string): void;
    }

    interface Chainable<Subject> {
      createOperator(optData: any): void;
    }

    interface Chainable<Subject> {
      editOperator(editData: any): void;
    }

    interface Chainable<Subject> {
      deleteOperator(): void;
    }

    interface Chainable<Subject> {
      createPermission(name: string): void;
    }

    interface Chainable<Subject> {
      editPermission(): void;
    }
    interface Chainable<Subject> {
      deletePermission(): void;
    }
    interface Chainable<Subject> {
      editMember(): void;
    }
    interface Chainable<Subject> {
      deleteDeposits(
        access: any,
        site: string,
        amount: any,
        accountID: string,
      ): void;
    }
    interface Chainable<Subject> {
      memberDeposit(
        access: any,
        site: string,
        accID: string,
        amount: string,
      ): void;
    }
    interface Chainable<Subject> {
      createMemberMarker(
        access: any,
        site: string,
        markerName: string,
        defaultStat: boolean,
        status: string,
      ): void;
    }
    interface Chainable<Subject> {
      deleteMemberMarker(access: any, site: string, markerID: any): void;
    }
    interface Chainable<Subject> {
      searchMember(memberUser: string): void;
    }
    interface Chainable<Subject> {
      updateConfigToDefault(acces: any, site: string): void;
    }
    interface Chainable<Subject> {
      updateConfig(
        acces: any,
        site: string,
        RealNameVerfication: boolean,
        GenderVerfication: boolean,
      ): void;
    }

    interface Chainable<Subject> {
      createAffiliateProgramme(access: any, site: string): void;
    }
    interface Chainable<Subject> {
      submitAffiliateProgramme(
        access: any,
        site: string,
        queryString: string,
      ): void;
    }
    interface Chainable<Subject> {
      updateAffiliate(access: any, site: string, queryString: string): void;
    }

    interface Chainable<Subject> {
      checkMemberBalance(access: any, site: string, memberId: string): void;
    }
    interface Chainable<Subject> {
      checkMemberLabel(access: any, site: string, labelName: string): void;
    }
    interface Chainable<Subject> {
      deleteMemberLabel(access: any, site: string, labelID: any): void;
    }
    interface Chainable<Subject> {
      createMemberLabel(access: any, site: string, labelName: string): void;
    }
    interface Chainable<Subject> {
      resetMemberLevelDefault(access: any, site: string, accID: string): void;
    }
    interface Chainable<Subject> {
      filterMemberMarker(access: any, site: string, markerName: string): void;
    }
    interface Chainable<Subject> {
      deactivateMemberMarker(access: any, site: string, markerID: any): void;
    }
    interface Chainable<Subject> {
      queryPaymentMethod(
        access: any,
        site: string,
        paymentMethodName: string,
      ): void;
    }
    interface Chainable<Subject> {
      deletePaymentMethod(
        access: any,
        site: string,
        paymentMethodID: any,
      ): void;
    }
    interface Chainable<Subject> {
      paymentMethodStatus(
        access: any,
        site: string,
        paymentMethodID: any,
        status: boolean,
      ): void;
    }
    interface Chainable<Subject> {
      createPaymentMethod(access: any, site: string, status: boolean): void;
    }
    interface Chainable<Subject> {
      queryWithdrawalMethod(
        access: any,
        site: string,
        withdrawalMethodName: string,
      ): void;
    }
    interface Chainable<Subject> {
      deleteWithdrawalMethod(
        access: any,
        site: string,
        withdrawalMethodID: any,
      ): void;
    }

    interface Chainable<Subject> {
      withdrawalMethodStatus(
        access: any,
        site: string,
        withdrawalMethodID: any,
        status: boolean,
      ): void;
    }
    interface Chainable<Subject> {
      createWithdrawalMethod(dataValue: any): void;
    }
    interface Chainable<Subject> {
      createPromoCategory(
        access: any,
        site: string,
        categoryName: string,
      ): void;
    }
    interface Chainable<Subject> {
      queryPromoCategories(
        access: any,
        site: string,
        categoryname: string,
      ): void;
    }
    interface Chainable<Subject> {
      deletePromoCategory(access: any, site: string, categoryID: string): void;
    }
    interface Chainable<Subject> {
      queryPromo(access: any, site: string): void;
    }
    interface Chainable<Subject> {
      updatePromo(
        access: any,
        site: string,
        promoID: any,
        status: boolean,
      ): void;
    }
    interface Chainable<Subject> {
      deletePromo(access: any, site: string, promoID: any): void;
    }
    interface Chainable<Subject> {
      createDraftPromo(
        access: any,
        site: string,
        promoName: string,
        categoryID: string,
      ): void;
    }
    interface Chainable<Subject> {
      submitPromo(access: any, site: string, promoID: any): void;
    }
    interface Chainable<Subject> {
      createPromoLabel(
        access: any,
        site: string,
        promoLabelName: string,
        labelColor: string,
      ): void;
    }
    interface Chainable<Subject> {
      updatePromoLabel(
        access: any,
        site: string,
        promoLabelName: string,
        labelColor: string,
        id: any,
      ): void;
    }
    interface Chainable<Subject> {
      deletePromoLabel(access: any, site: string, id: any): void;
    }
    interface QueryMemberLabelInput {
      queryInput: {
        access: string;
        site: string;
        labelName: string;
      }[];
    }
    interface Chainable<Subject> {
      queryPromoLabel(params: QueryMemberLabelInput): void;
    }

    interface Chainable<Subject> {
      createVIP(access: any, site: string, vipName: string): void;
    }
    interface Chainable<Subject> {
      publishedVIP(access: any, site: string, vipID: any): void;
    }
    interface Chainable<Subject> {
      activateVIP(access: any, site: string, vipID: any): void;
    }
    interface Chainable<Subject> {
      deactivateVIP(access: any, site: string, vipID: any): void;
    }
    interface Chainable<Subject> {
      queryVIP(access: any, site: string, vipName: string): void;
    }
    interface Chainable<Subject> {
      deleteVIP(access: any, site: string, vipID: any): void;
    }
    interface Chainable<Subject> {
      queryGameCategories(
        access: any,
        site: string,
        vendorCatName: string,
      ): void;
    }
    interface Chainable<Subject> {
      createGameCategory(
        access: any,
        site: string,
        vendorCatName: string,
      ): void;
    }
    interface Chainable<Subject> {
      deleteGameCategory(access: any, site: string, id: any): void;
    }
    interface Chainable<Subject> {
      updateVendor(access: any, site: string, gameCategoryID: any): void;
    }
    interface Chainable<Subject> {
      updateGameCategory(access: any, site: string, gameCategoryID: any): void;
    }
    interface Chainable<Subject> {
      updateGeoFenceConfig(access: any, site: string): void;
    }
    interface Chainable<Subject> {
      setFraudCheck(access: any, site: string, status: string): void;
    }
    interface Chainable<Subject> {
      sessionManagement(access: any, site: string, status: string): void;
    }
    interface Chainable<Subject> {
      updateAutomatedMessage(
        access: any,
        site: string,
        id: any,
        status: boolean,
      ): void;
    }

    interface Chainable<Subject> {
      editAutomatedMessage(
        access: any,
        site: string,
        id: any,
        title: string,
        content: string,
      ): void;
    }

    interface BoLoginInputs {
      inputs: {
        credentials: string;
        site: string;
      };
    }

    interface SiteLoginInputs {
      inputs: {
        credentials: string;
        site: string;
        code: string;
      };
    }

    interface MemberInputs {
      inputs: {
        access: string;
        site: string;
      };
    }

    interface LoginOutputs {
      refresh: string;
      access: string;
    }

    interface MemberOutputs {
      id: string;
      username: string;
      totalBalance: string;
    }

    interface Chainable<Subject> {
      boAuthentication(params: BoLoginInputs): Chainable<LoginOutputs>;
    }

    interface Chainable<Subject> {
      siteAuthentication(params: SiteLoginInputs): Chainable<LoginOutputs>;
    }

    interface Chainable<Subject> {
      resetPassword(access: any, site: string): void;
    }

    // ---------------------------Sanity Testing custom commands-------------------

    // ---------------------------Initial data setup commands ---------------------
    interface Chainable<Subject> {
      queryMemberMarker(access: any, site: string, markerName: string): void;
    }
    interface Chainable<Subject> {
      queryMemberLoyalty(access: any, site: string): void;
    }

    interface Chainable<Subject> {
      boCreateMember(
        access: any,
        site: string,
        firstName: string,
        lastName: string,
        username: string,
        mlvID: any,
        mllID: any,
      ): void;
    }
    interface Chainable<Subject> {
      queryMember(params: MemberInputs): Chainable<MemberOutputs>;
    }

    interface Chainable<Subject> {
      createHexopay(access: any, site: string): void;
    }
    interface Chainable<Subject> {
      createVIPlevel(access: any, site: string, vipID: any, vipMll: any): void;
    }
    interface Chainable<Subject> {
      queryVIPSetup(access: any, site: string, vipName: string): void;
    }
    interface Chainable<Subject> {
      checkVIPLevels(access: any, site: string, vipName: string): void;
    }
    interface Chainable<Subject> {
      queryPromoList(access: any, site: string, promoName: string): void;
    }
    interface Chainable<Subject> {
      createPermissionMember(access: any, site: string): void;
    }
    interface Chainable<Subject> {
      queryPermission(access: any, site: string, permission: string): void;
    }
    interface Chainable<Subject> {
      createPermissionReports(access: any, site: string): void;
    }
    interface Chainable<Subject> {
      createPermissionRebates(access: any, site: string): void;
    }
    interface Chainable<Subject> {
      createPermissionSysMgmt(access: any, site: string): void;
    }

    interface Chainable<Subject> {
      updateGBG_Signup(access: any, site: string): void;
    }

    interface Chainable<Subject> {
      updateGBG_Withdrawal(access: any, site: string): void;
    }

    interface Chainable<Subject> {
      disableGBG(access: any, site: string): void;
    }

    // for Join-spec Interim
    interface Chainable<Subject> {
      enableInterim(access: any, site: string): void;
    }

    interface Chainable<Subject> {
      enableLoqate(access: any, site: string): void;
    }
    //Update member status for GBG
    interface Chainable<Subject> {
      updateMemberStatus(access: any, site: string): void;
    }
  }
}

// Wallet BO authentication
Cypress.Commands.add(`boAuthentication`, (params) => {
  return cy
    .request({
      method: 'GET',
      url: params.inputs.site,
      form: true,
      headers: {
        Authorization: params.inputs.credentials,
      },
      failOnStatusCode: false,
    })
    .then((response) => {
      expect(response.body.access).to.exist;
      return response.body as Cypress.LoginOutputs;
    });
});

//wallet web login
Cypress.Commands.add(`siteAuthentication`, (params) => {
  return cy
    .request({
      method: 'GET',
      url: params.inputs.site,
      form: true,
      headers: {
        'admin-code': params.inputs.code,
        Authorization: params.inputs.credentials,
      },
      failOnStatusCode: false,
    })
    .then((response) => {
      expect(response.body.access).to.exist;
      return response.body as Cypress.LoginOutputs;
    });
});

// Affiliate queries
Cypress.Commands.add(`updateAffiliate`, (access, site, queryString) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: queryString,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateAffiliateProgramme).to.be.true;
  });
});

Cypress.Commands.add(
  `submitAffiliateProgramme`,
  (access, site, queryString) => {
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `mutation {submitAffiliateProgramme(
          id: "${queryString}",
          )}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data.submitAffiliateProgramme).to.be.true;
    });
  },
);

Cypress.Commands.add(`createAffiliateProgramme`, (access, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {createAffiliateProgramme(input:{
        name: "affiliateprog1",
        description: "desc",
        default: false,
        automaticPayoutClaiming: true,
        negativeCarryOverEnabled: true,
        vendorPlatformFees: [],
        depositTransactionCost: 0.5,
        thirdPartyDepositTransactionCost: 0.5,
        withdrawalTransactionCost: 0.5,
        thirdPartyWithdrawalTransactionCost: 0.5,
        promoCost: 0.5,
        rebateCost: 0.5,
        interestAccountCost: 0.5,
        minimumEffectiveBetRequirement: 100,
        minimumDepositRequirement: 100,
        minimumPayoutAccumulationEnabled: true,
        minimumPayoutAccumulationAmount: 100,
        turnoverRequirementMultiplier: 10,
        settlementPeriod: WEEKLY,
        settlementTime: "20:57:00.000Z",
        settlementDayOfWeek: 0,
        settlementDayOfMonth: 1,
        payoutClaimOffsetDuration: "86400000",
        payoutClaimExpiryDuration: "86400000",
        payoutExpiryDuration: "0",
        levels: [
          {
            name: "tier1",
            minimumActiveMembersCount: 1,
            minimumNetProfit: 1,
            percentage: 0.1
          },
          {
            name: "tier2",
            minimumActiveMembersCount: 4,
            minimumNetProfit: 7,
            percentage: 0.7
          }
        ],
        levelsRequirement: EITHER
        }) 
        }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createAffiliateProgramme).to.exist;
    const affiliateID = response.body.data.createAffiliateProgramme;
    cy.wrap(affiliateID).as(`affiliateID`);
  });
});

// Label management queries
Cypress.Commands.add(`checkMemberLabel`, (access, site, labelName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `query {memberTags(first: 10, filter: {name: {in: ["${labelName}"]}}) {
        edges {
          node {
            id
            name
            color
            description
          }
        }
      }
    }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.memberTags.edges).to.exist;
    const memberLabelList = response.body.data.memberTags.edges;
    if (memberLabelList.length >= 1) {
      const memberLabelID = response.body.data.memberTags.edges[0].node.id;
      cy.wrap(memberLabelID).as(`memberLabelID`);
    } else {
      const memberLabelID = null;
      cy.wrap(memberLabelID).as(`memberLabelID`);
    }
  });
});

Cypress.Commands.add(`deleteMemberLabel`, (access, site, labelID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {deleteMemberTag(id: "${labelID}")}`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.deleteMemberTag).to.be.true;
  });
});

Cypress.Commands.add(`createMemberLabel`, (access, site, labelName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        createMemberTag(input:{
          name: "${labelName}",
          color: "#673ab7",
          description: "aw"
        })
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createMemberTag).to.exist;
  });
});

Cypress.Commands.add(`setAdminCode`, (code) => {
  cy.visit(`/`);
  cy.get(`button[aria-label='changeAdminCode']`).click();
  cy.get(`input[name='code']`).clear().type(`${code}{enter}`);
  cy.contains(
    `li > .chakra-toast__inner .chakra-alert__title`,
    `Admin Code Changed to: ${code}`,
  );
});

Cypress.Commands.add(`checkDetails`, (value) => {
  for (let i = 0; i <= 9; i++) {
    if (value[i].field == 'Gender' || value[i].field == 'Title') {
      cy.get(`.chakra-tabs__tab-panel select`).eq(0).should(`exist`);
    } else if (
      value[i].field == 'Mobile Number' ||
      value[i].field == 'Birthday' ||
      value[i].field == 'Country'
    ) {
      cy.get(`.chakra-tabs__tab-panel input`)
        .eq(i - 2)
        .should(`have.value`, value[i].value);
    } else if (value[i].field == 'Currency') {
      cy.get(`.chakra-tabs__tab-panel input`)
        .eq(i + 1)
        .should(`have.value`, value[i].value);
    } else if (value[i].field == 'Email') {
      cy.get(`.email-notify label`).eq(0).should(`attr`, `data-checked`);
    } else {
      console.log(value[i].value);
      cy.get(`.chakra-tabs__tab-panel input`)
        .eq(i)
        .should(`have.value`, value[i].value);
    }
  }
});

Cypress.Commands.add(`navTo`, (num) => {
  cy.get(`.chakra-container .chakra-menu__menu-button`).should(`exist`).click();
  cy.get(`.chakra-container .chakra-menu__menu-button`)
    .invoke(`attr`, `aria-expanded`)
    .should(`equal`, 'true');
  cy.wait(1000);
  cy.contains(`Transactions`)
    .siblings(`div`)
    .find(`div:first()`)
    .eq(0)
    .should(`exist`)
    .click();
  cy.get(`.chakra-modal__body ul[role='list'] li`)
    .should(`exist`)
    .eq(num)
    .click();
});

Cypress.Commands.add(`fileList`, (value) => {
  for (let i = 0; i <= value.length - 1; i++) {
    cy.get(`option[value='${value[12].filelist}']`).should(`exist`);
  }
});

Cypress.Commands.add(`passwordReset`, (access, code, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      'Admin-code': code,
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation{
        updatePassword(input:{oldPassword: "Admin123!",newPassword: "password" })
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updatePassword).to.be.true;
  });
});

//Fetch if there are existing  Member docs
Cypress.Commands.add(`checkMemberDocs`, (access, code, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      'Admin-code': code,
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `query($filter:MemberDocumentsFilterInput){
        memberDocuments(filter:$filter){
          edges{
            node{
                id
            }
          }
        }
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.body.data.memberDocuments.edges.length !== 0) {
      expect(response.body.data.memberDocuments.edges[0].node.id).to.exist;
      const docsID = response.body.data.memberDocuments.edges[0].node.id;
      cy.wrap(docsID).as('docsID');
    } else {
      const docsID = `empty`;
      cy.wrap(docsID).as('docsID');
    }
  });
});

//Delete is there are existing member docs
Cypress.Commands.add(`deleteMemberDocs`, (deleteQuery, access, code, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      'Admin-code': code,
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: deleteQuery,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.deleteMemberDocument).to.be.true;
  });
});

Cypress.Commands.add(`signupFirstPage`, (data) => {
  for (let i = 0; i < 2; i++) {
    cy.get(`input[placeholder='${data[i].field}']`, { timeout: 40000 })
      .clear({ force: true })
      .type(chance.first(), { force: true });
  }
  cy.get(`.react-datepicker-wrapper path`).click({ force: true });
  cy.get(`.react-datepicker__header select`).select(`2000`);
  cy.get(
    `.react-datepicker__month .react-datepicker__day--keyboard-selected`,
  ).click();

  cy.get(`input[placeholder='${data[2].field}']`)
    .clear({ force: true })
    .type(chance.email({ domain: 'getnada.com' }));
  cy.contains(`Next`).click();
});

Cypress.Commands.add(`signupSecondPage`, () => {
  cy.get(`input[placeholder='Enter Mobile Number']`)
    .clear({ force: true })
    .type(generateNumbers(8), { force: true });
  cy.contains(`Please select postal code`)
    .siblings()
    .children()
    .clear({ force: true })
    .type(`4`, { force: true });

  cy.contains(`4, Skerry Hall, Boddam, Peterhead, AB42 3EW`, { timeout: 30000 })
    .parent()
    .should(`exist`)
    .type(`{enter}`);
  cy.get(`input[placeholder='City']`).should(`have.value`, `Aberdeen`);
  cy.contains(`Next`).click();
});

Cypress.Commands.add(`signupLastPage`, () => {
  const password = 'Password123!';
  cy.get(`input[placeholder='Username']`)
    .clear({ force: true })
    .type(generateString(8), { force: true });
  cy.get(`input[placeholder='Password']`).clear({ force: true }).type(password);
  cy.get(`input[placeholder='Confirm Password']`)
    .clear({ force: true })
    .type(password, { force: true });
  cy.get(`#DLA`).select(`170`);
  cy.get(`.chakra-checkbox__input`).eq(0).click({ force: true });
  cy.get(`.chakra-checkbox__input`).eq(5).click({ force: true });
});

Cypress.Commands.add(`createMember`, (code) => {
  const username = generateString(8);
  const encoded = `Basic ${btoa(`${username}:Password123!`)}`;
  cy.wrap(encoded).as(`encodedID`);
  const x: number = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
  let days: string = x.toString();
  x < 10 ? (days = `0${days}`) : days;
  cy.request({
    url: Cypress.env(`site`),
    method: 'POST',
    form: true,
    headers: {
      'Admin-code': code,
    },
    body: {
      query: `mutation {createMember(input: { password: "Password123!", username: "${username}", dateOfBirth: "2000-0${
        Math.floor(Math.random() * (9 - 1 + 1)) + 1
      }-${days}", gender: MALE, firstName: "${generateString(
        8,
      )}", lastName: "${generateString(8)}", address: {
          postCode: "Postal Code Test"
              } 
            } , captcha: "G54B") 
          }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createMember).to.exist;
  });
});

Cypress.Commands.add(`createOperator`, (optData) => {
  for (let i = 0; i < 3; i++) {
    if (optData[i].fields == 'email') {
      cy.get(`input[name='${optData[i].fields}']`)
        .clear()
        .type(`${generateString(6)}${optData[i].value}`);
    } else {
      cy.get(`input[name='${optData[i].fields}']`)
        .clear()
        .type(optData[i].value);
    }
  }
  cy.get(`input[name='username']`)
    .clear()
    .type(`r${generateString(8)}`);
  cy.get(`input[name='mobileNumber']`).clear().type(generateNumbers(10));
  cy.get(`span .ant-select-single`).click();
  cy.get(`.ant-select-item-option-content`).parent().eq(0).click();
  cy.get(`span >div>div .ant-select-selector`).click();
  cy.contains(`.ant-select-item-option-content`, optData[4].value).click();
  cy.contains(`Confirm`).click();
});

Cypress.Commands.add(`editOperator`, (editData) => {
  cy.get(`tbody>tr .anticon`).eq(0).click();
  cy.get(`.ant-dropdown-menu li`).eq(0).click();
  cy.get(`span >div>div .ant-select-selector`).click();
  for (let i = 0; i < editData.length; i++) {
    cy.contains(`.ant-select-item-option-content`, editData[i].value).click();
  }
  cy.contains(`Confirm`).click();
});

Cypress.Commands.add(`deleteOperator`, () => {
  cy.get(`tbody>tr .anticon`).eq(0).click();
  cy.get(`.ant-dropdown-menu li`).eq(1).click();
  cy.get(`.ant-modal-footer .ant-btn-primary`).click();
});

Cypress.Commands.add(`createPermission`, (name) => {
  cy.get(`input[name='name']`).clear().type(name);
  cy.get(`.ant-legacy-form-item-children .ant-tabs-tab-btn`).each(
    ($element, index) => {
      cy.wrap($element).click();
      cy.get(`.ant-legacy-form-item-children .ant-row .ant-checkbox-input`)
        .eq(index)
        .check();
    },
  );
});

Cypress.Commands.add(`editPermission`, () => {
  cy.get(`tbody>tr .anticon`).eq(0).click();
  cy.get(`.ant-dropdown-menu li`).eq(0).click();
  cy.get(
    `.ant-modal-body .ant-legacy-form-item-children .ant-tabs-tab-btn`,
  ).each(($element, index) => {
    cy.wrap($element).click();
    if (index >= 1) {
      cy.get(
        `.ant-modal-body .ant-legacy-form-item-children .ant-row .ant-checkbox-input`,
      )
        .eq(index)
        .uncheck();
    }
  });
});

Cypress.Commands.add(`deletePermission`, () => {
  cy.get(`tbody>tr .anticon`).eq(0).click();
  cy.get(`.ant-dropdown-menu li`).eq(2).click();
});

Cypress.Commands.add(`editMember`, () => {
  const fname = `R${generateString(6)}`;
  cy.get(`input[name='firstName']`).clear().type(fname);
  const lname = `M${generateString(6)}`;
  cy.get(`input[name='lastName']`).clear().type(lname);
  const mobileno = `${generateNumbers(14)}`;
  cy.get(`input[name="mobileNumber"]`).clear().type(mobileno);
  cy.wrap(fname).as(`firstname`);
  cy.wrap(lname).as(`lastname`);
  cy.wrap(mobileno).as(`mobileNumber`);
});

//Members tabs: Member balance custom commands
Cypress.Commands.add(`deleteDeposits`, (access, site, amount, accountID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },

    body: {
      query: `mutation { createManualAdjustment(input: {
        account: "${accountID}",
        amount: ${amount},
        type: SYSTEM_DEBIT, 
        remarks: "",
        turnoverRequirementMultiplier: 1
        }, password: "password")}`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createManualAdjustment).to.be.true;
  });
});

//Member tabs: Query member
Cypress.Commands.add(`checkMemberBalance`, (access, site, memberId) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },

    body: {
      query: `query {
        members(first: 10, filter: { id: { in: ["${memberId}"] } }) {
          totalCount
          edges {
            node {
              username
              lastName
              totalEffectiveBet
              effectiveBet
              status
              totalBalance
            }
          }
        }
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.members.edges[0].node.totalBalance).to.exist;
    const totalBalance = response.body.data.members.edges[0].node.totalBalance;
    if (totalBalance < 1) {
      const zeroBalance = null;
      cy.wrap(zeroBalance).as(`totalBalance`);
    } else {
      cy.wrap(totalBalance).as(`totalBalance`);
    }
  });
});

Cypress.Commands.add(`memberDeposit`, (access, site, accID, amount) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },

    body: {
      query: `mutation {
        createManualAdjustment(
          input: {
            account: "${accID}"
            amount: ${amount}
            actual: false
            type: DEPOSIT
            remarks: ""
            turnoverRequirementMultiplier: 1
          }
          password: "password"
        )
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createManualAdjustment).to.be.true;
  });
});

//Member marker custom commands
Cypress.Commands.add(`searchMember`, (memberUser) => {
  cy.contains(`Enter Username`).parent().click().type(memberUser);
  cy.get(`div[title='${memberUser}']`).click();
  cy.get(`tbody>tr:nth-child(2) td:nth-child(3)`).should(
    `have.text`,
    memberUser,
  );
});

Cypress.Commands.add(
  `createMemberMarker`,
  (access, site, markerName, defaultStat, status) => {
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },

      body: {
        query: `mutation {
        createMemberLevel(
          input: { name: "${markerName}", color: "#ffddd6", default: ${defaultStat}, status: ${status}}
        )
      }`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data.createMemberLevel).to.exist;
    });
  },
);

Cypress.Commands.add(`deleteMemberMarker`, (access, site, markerID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },

    body: {
      query: `mutation {deleteMemberLevel(id: "${markerID}")
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.deleteMemberLevel).to.be.true;
  });
});

Cypress.Commands.add(`deactivateMemberMarker`, (access, site, markerID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },

    body: {
      query: `mutation {
        updateMemberLevel(
          id: "${markerID}"
          input: { status: DISABLED }
        )
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateMemberLevel).to.be.true;
  });
});

Cypress.Commands.add(`resetMemberLevelDefault`, (access, site, accID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },

    body: {
      query: `mutation {
        updateMemberLevel(id: "${accID}", input: {
          color: "#fff3e3",
          name: "local",
          status: ENABLED,
          default: true
        })
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateMemberLevel).to.be.true;
  });
});

Cypress.Commands.add(`filterMemberMarker`, (access, site, markerName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },

    body: {
      query: `query {
        memberLevels(first: 10, filter: { name: { in: ["${markerName}"] } }) {
          edges {
            node {
              id
              status
              color
              name
              default
            }
          }
        }
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    const markerIDList = response.body.data.memberLevels.edges;
    if (markerIDList.length >= 1) {
      const memberMarkerStatus =
        response.body.data.memberLevels.edges[0].node.default;
      const markerID = response.body.data.memberLevels.edges[0].node.id;
      if (memberMarkerStatus) {
        cy.resetMemberLevelDefault(
          access,
          Cypress.env(`boStagingGraphql`),
          markerID,
        );
        cy.deactivateMemberMarker(
          access,
          Cypress.env(`boStagingGraphql`),
          markerID,
        );
      } else {
        cy.deactivateMemberMarker(
          access,
          Cypress.env(`boStagingGraphql`),
          markerID,
        );
      }
      cy.wrap(markerID).as(`markerID`);
    } else {
      const markerID = null;
      cy.wrap(markerID).as(`markerID`);
    }
  });
});

//Member Managememnt config custom commands
Cypress.Commands.add(`updateConfigToDefault`, (access, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        updateConfig(input: {
          isEmailReusable: false,
          isMobileNumberReusable: false,
          mobileNumberReusabilityCount: 0,
          emailReusabilityCount: 0
        })
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateConfig).to.be.true;
  });
});

// Member Profile setting
Cypress.Commands.add(
  `updateConfig`,
  (access, site, RealNameVerfication, GenderVerfication) => {
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `mutation {
        updateConfig(
          input: {
            memberFormFields: [
              {
                type: BUILT_IN
                required: true
                field: REAL_NAME
                updatable: ${RealNameVerfication}
                otpVerificationRequired: false
              }
              {
                type: BUILT_IN
                required: true
                field: GENDER
                updatable: ${GenderVerfication}
                otpVerificationRequired: false
              }
              {
                type: BUILT_IN
                required: true
                field: DATE_OF_BIRTH
                updatable: false
                otpVerificationRequired: false
              }
              {
                type: BUILT_IN
                required: true
                field: MOBILE_NUMBER
                updatable: false
                otpVerificationRequired: false
              }
              {
                type: BUILT_IN
                required: true
                field: EMAIL
                updatable: false
                otpVerificationRequired: false
              }
              {
                type: BUILT_IN
                required: false
                field: ADDRESS
                updatable: false
                otpVerificationRequired: false
              }
              {
                type: BUILT_IN
                required: false
                field: QQ_ID
                updatable: false
                otpVerificationRequired: false
              }
              {
                type: BUILT_IN
                required: false
                field: WECHAT_ID
                updatable: false
                otpVerificationRequired: false
              }
              {
                type: BUILT_IN
                required: false
                field: TITLE
                updatable: false
                otpVerificationRequired: false
              }
              {
                type: BUILT_IN
                required: false
                field: PHONE_NUMBER
                updatable: false
                otpVerificationRequired: false
              }
            ]
          }
        )
      }
      `,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data.updateConfig).to.be.true;
    });
  },
);

// Scenario: Admin view all members deposit transaction
Cypress.Commands.add(
  `queryPaymentMethod`,
  (access, site, paymentMethodName) => {
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `query {
        paymentMethods(first: 5, filter: { name: { in: ["${paymentMethodName}"] } }) {
          edges {
            node {
              id
              name
              remarks
              enabled
              currentAccumulation
              minimumDepositAmount
              maximumDepositAmount
              instructionText
              turnoverRequirementMultiplier
              maximumDepositAmountPerDay
              depositExpiry
              suggestedAmounts
              updateable
            }
          }
        }
      }`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      const paymentList = response.body.data.paymentMethods.edges;
      if (paymentList.length >= 1) {
        expect(response.body.data.paymentMethods.edges[0].node.name).to.exist;
        const paymentMethodID =
          response.body.data.paymentMethods.edges[0].node.id;
        cy.wrap(paymentMethodID).as(`paymentMethodID`);
      } else {
        const paymentMethodID = null;
        cy.wrap(paymentMethodID).as(`paymentMethodID`);
      }
    });
  },
);

Cypress.Commands.add(`deletePaymentMethod`, (access, site, paymentMethodID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        deletePaymentMethod(id: "${paymentMethodID}")
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.deletePaymentMethod).to.be.true;
  });
});

Cypress.Commands.add(
  `paymentMethodStatus`,
  (access, site, paymentMethodID, status) => {
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `mutation {
        updatePaymentMethod(id: "${paymentMethodID}", input: {
          enabled: ${status}
        })
      }`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data.updatePaymentMethod).to.be.true;
    });
  },
);

Cypress.Commands.add(`createPaymentMethod`, (access, site, status) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        createPaymentMethod(
          input: {
            name: "qaPaymentMethod"
            remarks: ""
            enabled: ${status}
            excludedMemberLevel: []
            memberLoyaltyLevel: []
            minimumDepositAmount: 5
            maximumDepositAmount: 100
            instructionText: ""
            maximumDepositAmountPerDay: 150
            depositExpiry: 30
            turnoverRequirementMultiplier: 1
            bank: ICBC
            accountNumber: "12345678"
            accountName: "testQA"
            branch: ""
            country: ""
            province: ""
            city: ""
            nickname: ""
            depositProvider: ""
            suggestedAmounts: []
            transactionFee: 0
            transactionFeeType: ABSOLUTE
            allowCustomAmount: true
            cryptocurrency: USDT
          }
          type: OFFLINE_BANK_TRANSFER
        )
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createPaymentMethod).to.exist;
  });
});

// Withdrawal Methods

Cypress.Commands.add(
  `queryWithdrawalMethod`,
  (access, site, withdrawalMethodName) => {
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `query {
          withdrawalMethods(filter: { name: { contains: "${withdrawalMethodName}" } }) {
            edges {
              node {
                value: id
                label: name
              }
            }
          }
        }
      `,
      },
      failOnStatusCode: false,
    }).then((response) => {
      const methodList = response.body.data.withdrawalMethods.edges;
      if (methodList.length >= 1) {
        expect(response.body.data.withdrawalMethods.edges[0].node.label).to
          .exist;
        const withdrawalMethodID =
          response.body.data.withdrawalMethods.edges[0].node.value;
        cy.wrap(withdrawalMethodID).as(`withdrawalMethodID`);
      } else {
        const withdrawalMethodID = null;
        cy.wrap(withdrawalMethodID).as(`withdrawalMethodID`);
      }
    });
  },
);

Cypress.Commands.add(
  `deleteWithdrawalMethod`,
  (access, site, withdrawalMethodID) => {
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `mutation {
        deleteWithdrawalMethod(id: "${withdrawalMethodID}")
      }
      `,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data.deleteWithdrawalMethod).to.be.true;
    });
  },
);

Cypress.Commands.add(
  `withdrawalMethodStatus`,
  (access, site, withdrawalMethodID, status) => {
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `mutation {
          updateOfflineBankTransferWithdrawalMethod(
            id: "${withdrawalMethodID}"
            input: { enabled: ${status} }
          )
        }`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data.updateOfflineBankTransferWithdrawalMethod).to.be
        .true;
    });
  },
);

Cypress.Commands.add(`createWithdrawalMethod`, (dataValue) => {
  cy.contains(`Add New Withdrawal Method`).click();

  dataValue.forEach((element: any) => {
    if (element.fields === 'bankSelect') {
      cy.get(`.ant-legacy-form-item-children [id='${element.fields}']`).type(
        `${element.value}{enter}`,
      );
    } else if (element.fields === 'false') {
      cy.get(
        `.ant-radio-group-outline > label:nth-child(${element.value}) input[name='enabled']`,
      ).check();
    } else {
      cy.get(`[name='${element.fields}']`).clear().type(element.value);
    }
  });
  cy.contains(`Confirm`).click();
  cy.reload();
  cy.contains(dataValue[0].value).should(`exist`);
});

// Promo category
Cypress.Commands.add(`createPromoCategory`, (access, site, categoryName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
          createPromoCategory(input: {
            name: "${categoryName}"
          })
        }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createPromoCategory).to.exist;
    const categoryID = response.body.data.createPromoCategory;
    cy.wrap(categoryID).as(`categoryID`);
  });
});

Cypress.Commands.add(`queryPromoCategories`, (access, site, categoryName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `{
          promoCategories {
            id
            name
            rank
            dateTimeCreated
            dateTimeUpdated
            __typename
          }
        }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.promoCategories).to.exist;

    const categories = response.body.data.promoCategories;
    const categoryNames = categories.map((x: any) => x.name);

    if (categoryNames.indexOf(categoryName) === -1) {
      const categoryRank = null;
      cy.wrap(categoryRank).as(`catID`);
    } else {
      cy.wrap(categories[categoryNames.indexOf(categoryName)].id).as(`catID`);
      cy.wrap(categories[categoryNames.indexOf(categoryName)].rank).as(`rank`);
    }
  });
});

Cypress.Commands.add(`deletePromoCategory`, (access, site, categoryID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation { deletePromoCategory(id: "${categoryID}")
      }`,
    },
    failOnStatusCode: false,
  }).then(() => {
    // expect(response.body.data.deletePromoCategory).to.be.true;
  });
});

Cypress.Commands.add(`queryPromo`, (access, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `query {
        promos(
          filter: { status: { in: [PUBLISHED, ACTIVE, DRAFT, PENDING, UNPUBLISHED] } }
        ) {
          totalCount
          edges {
            node {
              id
              name
            }
          }
        }
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.promos.edges).to.exist;
    const promos = response.body.data.promos.edges;
    const promoName = promos.map((x: any) => x.node.name);
    if (promoName.indexOf(`QAPromo`) === -1) {
      const promoID = null;
      cy.wrap(promoID).as(`promoID`);
    } else if (promoName.indexOf(`Copy of QAPromo`) !== -1) {
      const promoID = [
        promos[promoName.indexOf(`QAPromo`)].node.id,
        promos[promoName.indexOf(`Copy of QAPromo`)].node.id,
      ];
      cy.wrap(promoID).as(`promoID`);
    } else {
      const promoID = promos[promoName.indexOf(`QAPromo`)].node.id;
      cy.wrap(promoID).as(`promoID`);
    }
  });
});

Cypress.Commands.add(`updatePromo`, (access, site, promoID, status) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        updatePromo(
          id: "${promoID}"
          input: { published: ${status} }
        )
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updatePromo).to.be.true;
  });
});

Cypress.Commands.add(`deletePromo`, (access, site, promoID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        deletePromo(id: "${promoID}")
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.deletePromo).to.be.true;
  });
});

Cypress.Commands.add(
  `createDraftPromo`,
  (access, site, promoName, categoryID) => {
    const date = new Date();
    const today =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2);
    const nextYear =
      date.getFullYear() +
      1 +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2);

    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `mutation {
        createPromo(
          input: {
            automaticEnrollment: false
            automaticPayoutClaiming: false
            automaticEnrollmentApproval: true
            category: "${categoryID}"
            claimExpiryDuration: null
            claimOffsetDuration: null
            excludedMemberLevels: null
            maximumEnrolleesCount: null
            maximumEnrolleesCountPerIpAddress: null
            maximumEnrolleesCountPerName: null
            newMemberQualificationDuration: "7d"
            payoutExpiryDuration: "0d"
            payoutSettlementPeriod: INSTANT
            publicationSchedule: { mode: SAME_AS_VALIDITY_PERIOD }
            requiredMemberFields: []
            qualifyingMemberLoyaltyLevels: ["mll_95aabc67abb945f497ff15e4fde33d3e"]
            payoutSettlementTime: "00:00:00.000Z"
            turnoverRequirementMultiplier: 0
            validityDateTimeRange: {
              end: "${nextYear}T11:06:32.702Z",
              start: "${today}T00:00:00+08:00"
            }
            vendorTargets: []
            name: "${promoName}"
            banner: "fil_85e8fd21d0544e9eb17fec0fbfc78af9"
            payoutAmount: 5
            title: "${promoName}"
            subtitle: "${promoName}",
            description: "${promoName}",
            termsAndConditions: "${promoName}",
            template: SIGN_UP
            message: null
          }
        )
      }`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data.createPromo).to.exist;
      const promoID = response.body.data.createPromo;
      cy.wrap(promoID).as(`promoID`);
    });
  },
);

Cypress.Commands.add(`submitPromo`, (access, site, promoID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        submitPromo(id: "${promoID}")
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.submitPromo).to.be.true;
  });
});

Cypress.Commands.add(
  `createPromoLabel`,
  (access, site, promoLabelName, labelColor) => {
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `mutation {
        createPromoTag(input: { name: "${promoLabelName}", color: ${labelColor} })
      }`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data.createPromoTag).to.exist;
      const promoLabelID = response.body.data.createPromoTag;
      cy.wrap(promoLabelID).as(`promoLabelID`);
    });
  },
);

Cypress.Commands.add(
  `updatePromoLabel`,
  (access, site, promoLabelName, labelColor, id) => {
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `mutation {
        updatePromoTag(
          input: { name: "${promoLabelName}", color: ${labelColor} }
          id: "${id}"
        )
      }
      `,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data.updatePromoTag).to.be.true;
    });
  },
);

Cypress.Commands.add(`deletePromoLabel`, (access, site, id) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        deletePromoTag(id: "${id}")
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.deletePromoTag).to.be.true;
  });
});

Cypress.Commands.add(`queryPromoLabel`, (params) => {
  console.log(params.queryInput);
  params.queryInput.forEach((elememt) => {
    return cy
      .request({
        url: elememt.site,
        method: 'POST',
        form: true,
        headers: {
          Authorization: `Bearer ${elememt.access}`,
        },
        body: {
          query: `query {
          promoTags(first: 10, filter: { name: { contains: "${elememt.labelName}" } }) {
            totalCount
            edges {
              node {
                id
                name
              }
            }
          }
        }
        `,
        },
        failOnStatusCode: false,
      })
      .then((response) => {
        const count = response.body.data.promoTags.totalCount;
        if (count >= 1) {
          const labelID = response.body.data.promoTags.edges[0].node.id;
          console.log(labelID);
          cy.deletePromoLabel(elememt.access, elememt.site, labelID);
        }
      });
  });
});

// VIP Queries
Cypress.Commands.add(`createVIP`, (access, site, vipName) => {
  const date = new Date();
  const today =
    date.getFullYear() +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + date.getDate()).slice(-2);
  const nextYear =
    date.getFullYear() +
    1 +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + date.getDate()).slice(-2);

  const tier1 = generateString(32);
  const tier2 = generateString(32);

  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        createMemberLoyaltyProgramme: createMemberLoyaltyProgramme(
          input: {
            description: "This is VIP for Testing"
            validityStartDate: "${today}"
            validityEndDate: "${nextYear}"
            badgeSet: DARK_BLUE
            automaticMemberLoyaltyLevelUpgrade: true
            name: "${vipName}"
            levels: [
              {
                id: "mll_${tier1}"
                name: "qavip tier1"
                description: ""
                inviteOnly: false
                qualificationCriteria: {
                  type: BASE
                  and: [
                    { type: DEPOSIT, amount: 100 }
                    {
                      type: EFFECTIVE_BET
                      amount: 10
                      gameTypes: [
                        "SPORTSBOOK"
                        "LIVE"
                        "LOTTERY"
                        "SLOT"
                        "POKER"
                        "FISH"
                      ]
                    }
                  ]
                }
                color: "#000000"
                autoPayout: false
                upgradePayout: { amount: 5, turnover: 10, limit: 1 }
              }
              {
                id: "mll_${tier2}"
                name: "qavip tier2"
                description: ""
                inviteOnly: false
                qualificationCriteria: {
                  type: BASE
                  and: [
                    { type: DEPOSIT, amount: 500 }
                    {
                      type: EFFECTIVE_BET
                      amount: 20
                      gameTypes: [
                        "SPORTSBOOK"
                        "LIVE"
                        "LOTTERY"
                        "SLOT"
                        "POKER"
                        "FISH"
                      ]
                    }
                  ]
                }
                color: "#000000"
                autoPayout: false
                upgradePayout: { amount: 10, turnover: 20, limit: 1 }
              }
            ]
          }
        )
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createMemberLoyaltyProgramme).to.exist;
    const vipID = response.body.data.createMemberLoyaltyProgramme;
    cy.wrap(vipID).as(`vipID`);
  });
});

Cypress.Commands.add(`publishedVIP`, (access, site, vipID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        submitMemberLoyaltyProgramme(id: "${vipID}")
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.submitMemberLoyaltyProgramme).to.be.true;
  });
});

Cypress.Commands.add(`activateVIP`, (access, site, vipID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        activateMemberLoyaltyProgramme(id: "${vipID}")
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.activateMemberLoyaltyProgramme).to.be.true;
  });
});

Cypress.Commands.add(`deactivateVIP`, (access, site, vipID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        deactivateMemberLoyaltyProgramme(id: "${vipID}")
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.deactivateMemberLoyaltyProgramme).to.be.true;
  });
});

Cypress.Commands.add(`queryVIP`, (access, site, vipName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `query {
        memberLoyaltyProgrammes: memberLoyaltyProgrammes(
          first: 10
          filter: { name: { in: ["${vipName}"] } }
        ) {
          totalCount
          edges {
            node {
              id
              name
            }
          }
        }
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.memberLoyaltyProgrammes.totalCount).to.exist;
    const count = response.body.data.memberLoyaltyProgrammes.totalCount;
    if (count >= 1) {
      const vipID = response.body.data.memberLoyaltyProgrammes.edges[0].node.id;
      cy.wrap(vipID).as(`vipID`);
    } else {
      const vipID = null;
      cy.wrap(vipID).as(`vipID`);
    }
  });
});

Cypress.Commands.add(`deleteVIP`, (access, site, vipID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        deleteMemberLoyaltyProgramme(id: "${vipID}")
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.deleteMemberLoyaltyProgramme).to.be.true;
  });
});
//Vendor Category
Cypress.Commands.add(`queryGameCategories`, (access, site, vendorCatName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `query {
        gameCategories(filter: { platform: { eq: DESKTOP } }) {
          id
          name
          gameTypes
          platform
          rank
          vendors {
            id
            name(language: EN)
            type
            externalLobby
          }
        }
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.gameCategories).to.exist;
    const vendorCategories = response.body.data.gameCategories;
    const categoryNames = vendorCategories.map((x: any) => x.name);
    if (categoryNames.indexOf(vendorCatName) === -1) {
      const vendorCategoryID = null;
      const gameTypes = null;
      cy.wrap(vendorCategoryID).as(`vendorCategoryID`);
      cy.wrap(gameTypes).as(`gameTypes`);
    } else {
      const vendorCategoryID =
        vendorCategories[categoryNames.indexOf(vendorCatName)].id;
      const gameTypes =
        vendorCategories[categoryNames.indexOf(vendorCatName)].gameTypes[0];
      const vendors =
        vendorCategories[categoryNames.indexOf(vendorCatName)].vendors;
      const vendorsCount = vendors.length;
      cy.wrap(vendorsCount).as(`vendorsCount`);
      cy.wrap(vendorCategoryID).as(`vendorCategoryID`);
      cy.wrap(gameTypes).as(`gameTypes`);
    }
  });
});

Cypress.Commands.add(`createGameCategory`, (access, site, vendorCatName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        createGameCategory(
          input: {
            platform: DESKTOP
            name: "${vendorCatName}"
            gameTypes: [SLOT]
            icon: "fil_bf57d330088e473e8148d5a707584651"
            vendors: []
          }
        )
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createGameCategory).to.exist;
    const vendorCategoryID = response.body.data.createGameCategory;
    cy.wrap(vendorCategoryID).as(`vendorCategoryID`);
  });
});

Cypress.Commands.add(`deleteGameCategory`, (access, site, id) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        deleteGameCategory(id: "${id}")
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.deleteGameCategory).to.be.true;
  });
});

Cypress.Commands.add(`updateVendor`, (access, site, gameCategoryID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        updateVendor(
          id: "vnd_f0d6aae72c705dccbb747869b9f26152"
          input: { externalLobby: { ${gameCategoryID}: true } }
        )
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateVendor).to.be.true;
  });
});

Cypress.Commands.add(`updateGameCategory`, (access, site, gameCategoryID) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        updateGameCategory(
          id: "${gameCategoryID}"
          input: { vendors: ["vnd_f0d6aae72c705dccbb747869b9f26152"] }
        )
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateGameCategory).to.be.true;
  });
});

Cypress.Commands.add(`updateGeoFenceConfig`, (access, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        updateGeoFenceConfig(
          input: {
            whitelistTarget: [
              "pla_7d710557f3565bafbf9a0153b01de3ff"
              "pla_57bfb325cb60561ca617d9171646d72c"
              "pla_2add2db290495c47bc6522fa3ab5165d"
              "pla_c38133cf5fb45e89a18dfecb0ccad278"
              "pla_e002112dd2be50df867a15fabd00bf2f"
              "pla_32d8c4b9d7fa5f04b16f72d80fe56c71"
              "pla_82fc5122f29a533d8f75f0770863e0cb"
              "pla_3e00ba8444f45dc2977db7a6ba30f04f"
              "pla_f41d811f0cd55c69b71ff97cdffa5f7d"
              "pla_ef60b76de1ee5777879ac6d7535248ad"
              "pla_44c397127cb855539ee7ec2d4745a073"
              "pla_3c08a0f14e5b56b78fa2894491b04a95"
              "pla_d3868fef81915c1ea68d5fb6b53373c8"
              "pla_850e125a28d95947846e280b45b079aa"
              "pla_b229d55400bb534fa73ed60af9b11bfe"
              "pla_3dbddba0c6575b7a91f5ef2a01fc81df"
              "pla_f2991d256cd65baba25ba61135e1afc3"
              "pla_c249785ac439596198b75cc5946d6ead"
              "pla_eb23942b1b095cea93ccbb832aa11eae"
              "pla_ace94a6714d1573fbf52654e948052f6"
              "pla_bc175944867757d39dfc3aa887b56a11"
            ]
            whitelistExcluded: []
            whitelistTargetIPs: []
            whitelistExcludedIPs: []
            blacklistTarget: []
            blacklistExcluded: []
            blacklistTargetIPs: []
            blacklistExcludedIPs: []
            type: FRONTEND
            activeRule: WHITELIST
          }
        )
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateGeoFenceConfig).to.be.true;
  });
});

Cypress.Commands.add(`setFraudCheck`, (access, site, status) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        updateConfig(input: {
          checkFraud: ${status}
        })
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateConfig).to.be.true;
  });
});

Cypress.Commands.add(`sessionManagement`, (access, site, status) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        updateConfig(input: {
          multipleSession: ${status}
        })
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateConfig).to.be.true;
  });
});

Cypress.Commands.add(`updateAutomatedMessage`, (access, site, id, status) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        updateAutomatedMessage(id: "${id}", input: {
          enabled: ${status}
        })
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateAutomatedMessage).to.be.true;
  });
});

Cypress.Commands.add(
  `editAutomatedMessage`,
  (access, site, id, title, content) => {
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `mutation {
        updateAutomatedMessage(
          id: "${id}"
          input: {
            title_en: "${title}"
            content_en: "${content}"
            title_zh: "存款申请已收悉 - £$Amount"
            content_zh: "您于$RequestDateTime提交的£$Amount存款申请已收悉，我们将尽快进行审核。"
          }
        )
      }
      `,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data.updateAutomatedMessage).to.be.true;
    });
  },
);

Cypress.Commands.add(`resetPassword`, (access, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
          updateMe(input: { password: "password" }, password: "randomPass")
        }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateMe).to.be.true;
  });
});

//----------------------------------Sanity testing custom commands------------------
//----------------------------------Initial data setup commnads---------------------

//  Scenario Outline: Create member <username>
Cypress.Commands.add(`queryMemberMarker`, (access, site, markerName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },

    body: {
      query: `query {
        memberLevels(first: 10, filter: { name: { in: ["${markerName}"] } }) {
          totalCount
          edges {
            node {
              id
              status
              color
              name
              default
            }
          }
        }
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.memberLevels.totalCount).to.equal(1);
    const mlv = response.body.data.memberLevels.edges[0].node.id;
    cy.wrap(mlv).as(`mlvID`);
  });
});

Cypress.Commands.add(`queryMemberLoyalty`, (access, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `query {
        memberLoyaltyProgrammes: memberLoyaltyProgrammes(
          first: 5
          filter: { name: { in: ["VIP"] } }
        ) {
          totalCount
          edges {
            cursor
            node {
              id
              levels {
                id
              }
            }
          }
        }
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.memberLoyaltyProgrammes.totalCount).to.equal(1);
    const mll =
      response.body.data.memberLoyaltyProgrammes.edges[0].node.levels[0].id;
    cy.wrap(mll).as(`mllID`);
  });
});

Cypress.Commands.add(
  `boCreateMember`,
  (access, site, firstName, lastName, username, mlvID, mllID) => {
    const newemail = chance.email({ domain: 'gmail.com' });
    const x: number = Math.floor(Math.random() * (28 - 1 + 1)) + 1;
    let days: string = x.toString();
    x < 10 ? (days = `0${days}`) : days;

    const date = new Date();
    const randomDate =
      `2000` + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + days;
    cy.request({
      url: site,
      method: 'POST',
      form: true,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        query: `mutation {
          createMember(
            input: {
              username: "${username}"
              password: "password"
              email: "${newemail}"
              memberLevel: "${mlvID}"
              dateOfBirth: "${randomDate}"
              gender: MALE
              mobileNumber: "${generateNumbers(10)}"
              status: ENABLED
              firstName: "${firstName}"
              lastName: "${lastName}"
              countryCode: "+1"
              communicationTypePreferences: [EMAIL]
              depositLimitFrequency: DAILY
              depositLimit: 1000
              memberLoyaltyLevels: ["${mllID}"]
              address: { address: "" }
              title: MR
            }
          )
        }        
      `,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data.createMember).to.exist;
    });
  },
);

Cypress.Commands.add(`queryMember`, (params) => {
  cy.request({
    url: params.inputs.site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${params.inputs.access}`,
    },
    body: {
      query: `query {
        members(first: 1, filter: {}) {
          totalCount
          edges {
            cursor
            node {
              id
              username
              totalBalance
            }
          }
        }
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response.body.data.members.edges[0].node as Cypress.MemberOutputs;
    // expect(response.body.data.members.edges).to.be.greaterThan(0);
    // const id:string = response.body.data.members.edges[0].node.id;
    // const username:string = response.body.data.members.edges[0].node.username;
  });
});

//   Scenario: Create Hexopay
Cypress.Commands.add(`createHexopay`, (access, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        createPaymentMethod(input: {
          name: "Hexopay",
          remarks: "",
          enabled: true,
          excludedMemberLevel: [],
          memberLoyaltyLevel: [],
          minimumDepositAmount: 1,
          maximumDepositAmount: 999999,
          instructionText: "",
          maximumDepositAmountPerDay: 999999,
          depositExpiry: 45,
          turnoverRequirementMultiplier: 0,
          nickname: "",
          depositProvider: "",
          suggestedAmounts: [
            1000
          ],
          transactionFee: 0,
          transactionFeeType: ABSOLUTE,
          allowCustomAmount: true,
          cryptocurrency: USDT,
          paymentChannel: ""
        } , type: HEXOPAY)
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createPaymentMethod).to.exist;
  });
});

//   Scenario: Create VIP draft programme
Cypress.Commands.add(`queryVIPSetup`, (access, site, vipName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `query {
        memberLoyaltyProgrammes: memberLoyaltyProgrammes(
          first: 10
          filter: { name: { in: ["${vipName}"] } }
        ) {
          totalCount
          edges {
            node {
              id
              name
              levels {
                id
            }
            }
          }
        }
      }`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.memberLoyaltyProgrammes.totalCount).to.exist;
    const vipID = response.body.data.memberLoyaltyProgrammes.edges[0].node.id;
    const vipMll =
      response.body.data.memberLoyaltyProgrammes.edges[0].node.levels[0].id;
    cy.createVIPlevel(access, site, vipID, vipMll);
  });
});

Cypress.Commands.add(`checkVIPLevels`, (access, site, vipName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `query {
        memberLoyaltyProgrammes: memberLoyaltyProgrammes(
          first: 10
          filter: { name: { in: ["${vipName}"] } }
        ) {
          totalCount
          edges {
            node {
              id
              name
              levels {
                id
              }
            }
          }
        }
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.memberLoyaltyProgrammes.totalCount).to.exist;
    const levels: any[] =
      response.body.data.memberLoyaltyProgrammes.edges[0].node.levels;
    console.log(levels);
    // expect(levels.length).to.equal(3);
  });
});

Cypress.Commands.add(`createVIPlevel`, (access, site, vipID, vipMll) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        updateMemberLoyaltyProgramme: updateMemberLoyaltyProgramme(
          id: "${vipID}"
          input: {
            name: "VIP"
            automaticMemberLoyaltyLevelUpgrade: false
            description: ""
            badgeSet: PRIMARY
            levels: [
              {
                id: "${vipMll}"
                name: "Tier 01"
                description: ""
                inviteOnly: false
                color: "#000000"
                qualificationCriteria: {
                  type: BASE
                  and: [
                    { type: DEPOSIT, amount: 0 }
                    {
                      type: EFFECTIVE_BET
                      amount: 0
                      gameTypes: [
                        "SPORTSBOOK"
                        "LIVE"
                        "LOTTERY"
                        "SLOT"
                        "POKER"
                        "FISH"
                      ]
                    }
                  ]
                }
                maximumWithdrawalAmountPerRequest: 0
                maximumWithdrawalRequest: 0
                withdrawalLimitFee: 0
                withdrawalLimitFeeType: ABSOLUTE
                bankAccountLimits: 0
                eWalletLimits: 0
                autoPayout: false
                upgradePayout: {
                  limit: 1
                  amount: 0
                  claimExpiryAmount: 0
                  claimOffsetAmount: 0
                  turnover: 0
                }
              }
              {
                id: "mll_770dc678a465452b8fd5c0b07681bfa9"
                name: "Tier 02"
                description: ""
                inviteOnly: false
                qualificationCriteria: {
                  type: BASE
                  and: [
                    { type: DEPOSIT, amount: 1000 }
                    {
                      type: EFFECTIVE_BET
                      amount: 0
                      gameTypes: [
                        "SPORTSBOOK"
                        "LIVE"
                        "LOTTERY"
                        "SLOT"
                        "POKER"
                        "FISH"
                      ]
                    }
                  ]
                }
                color: "#000000"
                autoPayout: false
                upgradePayout: { amount: 100, turnover: 2, limit: 1 }
              }
              {
                id: "mll_2f4f13fa19374cf6adafee393dcae484"
                name: "Tier 03"
                description: ""
                inviteOnly: false
                qualificationCriteria: {
                  type: BASE
                  and: [
                    { type: DEPOSIT, amount: 2000 }
                    {
                      type: EFFECTIVE_BET
                      amount: 0
                      gameTypes: [
                        "SPORTSBOOK"
                        "LIVE"
                        "LOTTERY"
                        "SLOT"
                        "POKER"
                        "FISH"
                      ]
                    }
                  ]
                }
                color: "#000000"
                autoPayout: false
                upgradePayout: { amount: 100, turnover: 2, limit: 1 }
              }
            ]
          }
        )
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.updateMemberLoyaltyProgramme).to.be.true;
  });
});

Cypress.Commands.add(`queryPromoList`, (access, site, promoName) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `query {
        promos(
          filter: {
            status: { in: [PUBLISHED, ACTIVE, DRAFT, PENDING, UNPUBLISHED] }
            name: { contains: "${promoName}" }
            template: { ne: EXTERNAL }
          }
        ) {
          totalCount
          edges {
            node {
              message {
                title
                content
                __typename
              }
              id
              title
              newMemberQualificationDuration
              category {
                name
                id
              }
              name
              status
            }
          }
        }
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.promos.totalCount).to.equal(1);
  });
});

//Permission group
Cypress.Commands.add(`createPermissionMember`, (access, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        createPermissionGroup(input: {
          name: "Members",
          permissions: [
            "MEMBERS",
            "MEMBERS:MEMBER_MANAGEMENT",
            "MEMBERS:MEMBER_MANAGEMENT:LIST",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:ACCOUNT_BALANCE",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:WALLET_BALANCE",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:TO_BALANCE",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:LAST_DEPOSIT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:LAST_WITHDRAWAL",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:LAST_PROMO_APPLIED",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:LAST_PLAYED_GAMES",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:MEMBER_NOTES",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:MEMBER_NOTES:LIST",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:MEMBER_NOTES:ADD",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:MEMBER_NOTES:EDIT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:MEMBER_NOTES:DELETE",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:MEMBER_INTERACTION_LOGS_REPORT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:MEMBER_INTERACTION_LOGS_REPORT:LIST",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:DOCUMENT_MANAGEMENT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:DOCUMENT_MANAGEMENT:LIST",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:DOCUMENT_MANAGEMENT:UPLOAD",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:DOCUMENT_MANAGEMENT:APPROVE",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:DOCUMENT_MANAGEMENT:REJECT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:REALITY_CHECK",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:REALITY_CHECK:LIST",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:REALITY_CHECK:EDIT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:DEPOSIT_LIMIT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:DEPOSIT_LIMIT:LIST",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:DEPOSIT_LIMIT:EDIT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:INTERNAL_SELF_EXCLUSION",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:INTERNAL_SELF_EXCLUSION:LIST",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:INTERNAL_SELF_EXCLUSION:EDIT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:TIMEOUT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:TIMEOUT:LIST",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:TIMEOUT:EDIT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:AGENT_AFFILIATE",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:MEMBER_INFORMATION",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:VIP_TIER_PROGRESS",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:MEMBER_LABEL",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:USER_PROFILE",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:LOGIN_DETAILS",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:CONTACT_DETAILS",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:WITHDRAWAL_BANK_ACCOUNT",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:REGISTRATION_INFORMATION",
            "MEMBERS:MEMBER_MANAGEMENT:VIEW_DETAILS:MESSAGES",
            "MEMBERS:MEMBER_MANAGEMENT:CREATE",
            "MEMBERS:MEMBER_MANAGEMENT:EDIT_BALANCE",
            "MEMBERS:MEMBER_MANAGEMENT:EDIT_LABEL",
            "MEMBERS:MEMBER_MANAGEMENT:EDIT_STATUS",
            "MEMBERS:MEMBER_MANAGEMENT:EDIT_MEMBER",
            "MEMBERS:MEMBER_MANAGEMENT:EDIT_MEMBER_MARKER",
            "MEMBERS:MEMBER_MANAGEMENT:EDIT_VIP",
            "MEMBERS:MEMBER_MANAGEMENT:DELETE",
            "MEMBERS:MEMBER_MANAGEMENT:CHANGE_PASSWORD",
            "MEMBERS:MEMBER_MANAGEMENT:CHANGE_WITHDRAWAL_PASSWORD",
            "MEMBERS:MEMBER_MANAGEMENT:SEND_MESSAGE",
            "MEMBERS:MEMBER_MARKER_MANAGEMENT",
            "MEMBERS:MEMBER_MARKER_MANAGEMENT:LIST",
            "MEMBERS:MEMBER_MARKER_MANAGEMENT:VIEW_DETAILS",
            "MEMBERS:MEMBER_MARKER_MANAGEMENT:CREATE",
            "MEMBERS:MEMBER_MARKER_MANAGEMENT:EDIT",
            "MEMBERS:MEMBER_MARKER_MANAGEMENT:DELETE",
            "MEMBERS:MEMBER_MARKER_MANAGEMENT:TOGGLE_ACTIVATION",
            "MEMBERS:LABEL_MANAGEMENT",
            "MEMBERS:LABEL_MANAGEMENT:LIST",
            "MEMBERS:LABEL_MANAGEMENT:VIEW_DETAILS",
            "MEMBERS:LABEL_MANAGEMENT:CREATE",
            "MEMBERS:LABEL_MANAGEMENT:EDIT",
            "MEMBERS:LABEL_MANAGEMENT:DELETE",
            "MEMBERS:MEMBERS_ONLINE",
            "MEMBERS:MEMBERS_BULK_UPDATE_STATUS",
            "MEMBERS:REPORTS",
            "MEMBERS:REPORTS:IP_ADDRESS_SUMMARY_REPORT",
            "MEMBERS:REPORTS:MEMBER_ACCESS_HISTORY_REPORT",
            "MEMBERS:REPORTS:MEMBER_ACCESS_SUMMARY_REPORT",
            "MEMBERS:REPORTS:MEMBER_INTERACTION_LOGS_REPORT",
            "MEMBERS:REPORTS:MEMBER_IP_ADDRESS_REPORT",
            "MEMBERS:REPORTS:MEMBER_SESSION_DURATION_REPORT",
            "MEMBERS:MEMBER_MANAGEMENT:CONFIG",
            "MEMBERS:MEMBER_MANAGEMENT:CONFIG:VIEW",
            "MEMBERS:MEMBER_MANAGEMENT:CONFIG:EDIT"
          ]
        })
      }
      
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createPermissionGroup).to.exist;
  });
});

Cypress.Commands.add(`createPermissionReports`, (access, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        createPermissionGroup(input: {
          name: "Reports",
          permissions: [
            "REPORTS",
            "REPORTS:DAILY_OPERATING_REPORT",
            "REPORTS:DAILY_OPERATING_REPORT:LIST",
            "REPORTS:DAILY_OPERATING_REPORT:CSV_DOWNLOAD_BUTTON",
            "REPORTS:MEMBER_BET_RECORDS",
            "REPORTS:MEMBER_BET_RECORDS:LIST",
            "REPORTS:MEMBER_BET_RECORDS:CSV_DOWNLOAD_BUTTON",
            "REPORTS:BALANCE_TRANSACTION_REPORTS",
            "REPORTS:BALANCE_TRANSACTION_REPORTS:LIST",
            "REPORTS:BALANCE_TRANSACTION_REPORTS:CSV_DOWNLOAD_BUTTON",
            "REPORTS:PROMO_PAYOUT_RECORDS",
            "REPORTS:PROMO_PAYOUT_RECORDS:LIST",
            "REPORTS:PROMO_PAYOUT_RECORDS:CSV_DOWNLOAD_BUTTON",
            "REPORTS:REBATES_REPORTS",
            "REPORTS:REBATES_REPORTS:LIST",
            "REPORTS:REBATES_REPORTS:CSV_DOWNLOAD_BUTTON",
            "REPORTS:BALANCE_SERVICE_RECORD_REPORTS",
            "REPORTS:BALANCE_SERVICE_RECORD_REPORTS:LIST",
            "REPORTS:BALANCE_SERVICE_RECORD_REPORTS:CSV_DOWNLOAD_BUTTON",
            "REPORTS:MEMBER_SUMMARY_REPORT",
            "REPORTS:MEMBER_SUMMARY_REPORT:LIST",
            "REPORTS:MEMBER_SUMMARY_REPORT:CREATE",
            "REPORTS:MEMBER_SUMMARY_REPORT:DOWNLOAD_SPREADSHEET",
            "REPORTS:EU_REPORTS",
            "REPORTS:EU_REPORTS:CSV_DOWNLOAD_BUTTON"
          ]
        })
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createPermissionGroup).to.exist;
  });
});

Cypress.Commands.add(`createPermissionRebates`, (access, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        createPermissionGroup(input: {
          name: "Rebates",
          permissions: [
            "REBATES",
            "REBATES:REBATES:REBATE_GROUP",
            "REBATES:REBATES:REBATE_GROUP:LIST",
            "REBATES:REBATES:REBATE_GROUP:CREATE",
            "REBATES:REBATES:REBATE_GROUP:EDIT",
            "REBATES:REBATES:REBATE_GROUP:DELETE",
            "REBATES:REBATES:REBATE_GROUP:DUPLICATE"
          ]
        })
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createPermissionGroup).to.exist;
  });
});

Cypress.Commands.add(`createPermissionSysMgmt`, (access, site) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `mutation {
        createPermissionGroup(input: {
          name: "System Management",
          permissions: [
            "SYSTEM_MANAGEMENT",
            "SYSTEM_MANAGEMENT:SITE_CONFIG",
            "SYSTEM_MANAGEMENT:SITE_CONFIG:SUBDOMAIN:VIEW_DETAILS",
            "SYSTEM_MANAGEMENT:SITE_CONFIG:SUBDOMAIN:LIST",
            "SYSTEM_MANAGEMENT:SITE_CONFIG:SUBDOMAIN:CREATE",
            "SYSTEM_MANAGEMENT:SITE_CONFIG:SUBDOMAIN:EDIT",
            "SYSTEM_MANAGEMENT:SITE_CONFIG:SUBDOMAIN:DELETE",
            "SYSTEM_MANAGEMENT:SITE_CONFIG:SUBDOMAIN:DUPLICATE",
            "SYSTEM_MANAGEMENT:ALERTS_AND_NOTIFICATIONS",
            "SYSTEM_MANAGEMENT:ALERTS_AND_NOTIFICATIONS:VIEW_DETAILS",
            "SYSTEM_MANAGEMENT:ALERTS_AND_NOTIFICATIONS:LIST",
            "SYSTEM_MANAGEMENT:ALERTS_AND_NOTIFICATIONS:CREATE",
            "SYSTEM_MANAGEMENT:MOBILE_APP_CONFIG",
            "SYSTEM_MANAGEMENT:MOBILE_APP_CONFIG:CATEGORY:LIST",
            "SYSTEM_MANAGEMENT:MOBILE_APP_CONFIG:CATEGORY:VIEW_DETAILS",
            "SYSTEM_MANAGEMENT:MOBILE_APP_CONFIG:CATEGORY:CREATE",
            "SYSTEM_MANAGEMENT:MOBILE_APP_CONFIG:CATEGORY:EDIT",
            "SYSTEM_MANAGEMENT:MOBILE_APP_CONFIG:CATEGORY:DELETE",
            "SYSTEM_MANAGEMENT:MOBILE_APP_CONFIG:CATEGORY:ADD_VENDOR",
            "SYSTEM_MANAGEMENT:MARQUEE_MESSAGES",
            "SYSTEM_MANAGEMENT:MARQUEE_MESSAGES:LIST",
            "SYSTEM_MANAGEMENT:MARQUEE_MESSAGES:VIEW_DETAILS",
            "SYSTEM_MANAGEMENT:MARQUEE_MESSAGES:CREATE",
            "SYSTEM_MANAGEMENT:MARQUEE_MESSAGES:EDIT",
            "SYSTEM_MANAGEMENT:MARQUEE_MESSAGES:DELETE",
            "SYSTEM_MANAGEMENT:MARQUEE_MESSAGES:TOGGLE_ENABLED",
            "SYSTEM_MANAGEMENT:ROTATING_BANNER",
            "SYSTEM_MANAGEMENT:ROTATING_BANNER:LIST",
            "SYSTEM_MANAGEMENT:ROTATING_BANNER:VIEW_DETAILS",
            "SYSTEM_MANAGEMENT:ROTATING_BANNER:CREATE",
            "SYSTEM_MANAGEMENT:ROTATING_BANNER:EDIT",
            "SYSTEM_MANAGEMENT:ROTATING_BANNER:DUPLICATE",
            "SYSTEM_MANAGEMENT:ROTATING_BANNER:DELETE",
            "SYSTEM_MANAGEMENT:ROTATING_BANNER:TOGGLE_ENABLE",
            "SYSTEM_MANAGEMENT:ROTATING_BANNER:BANNER_SETTINGS:VIEW",
            "SYSTEM_MANAGEMENT:ROTATING_BANNER:BANNER_SETTINGS:EDIT",
            "SYSTEM_MANAGEMENT:GEO_FENCING",
            "SYSTEM_MANAGEMENT:GEO_FENCING:VIEW",
            "SYSTEM_MANAGEMENT:GEO_FENCING:EDIT",
            "SYSTEM_MANAGEMENT:SYSTEM_CONFIG",
            "SYSTEM_MANAGEMENT:SYSTEM_CONFIG:VIEW:FORCE_VERIFICATION",
            "SYSTEM_MANAGEMENT:SYSTEM_CONFIG:EDIT:FORCE_VERIFICATION",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG:MANAGE_CURRENCY",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG:MANAGE_COUNTRY",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG:MANAGE_COUNTRY_CODE",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG:MANAGE_REALITY_CHECK",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG:EMAIL_AUDIT_TRAIL",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG:CHECK_FRAUD",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG:SESSION_MANAGEMENT",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG:HEXOPAY_SHOP_DETAILS",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG:MANAGE_EMAIL_CONTENT",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG:MANAGE_SMTP_CONFIG",
            "SYSTEM_MANAGEMENT:COMMON_CONFIG:MANAGE_DYNAMIC_PAGES",
            "SYSTEM_MANAGEMENT:DESKTOP_APP_CONFIG",
            "SYSTEM_MANAGEMENT:DESKTOP_APP_CONFIG:CATEGORY:LIST",
            "SYSTEM_MANAGEMENT:DESKTOP_APP_CONFIG:CATEGORY:VIEW_DETAILS",
            "SYSTEM_MANAGEMENT:DESKTOP_APP_CONFIG:CATEGORY:CREATE",
            "SYSTEM_MANAGEMENT:DESKTOP_APP_CONFIG:CATEGORY:EDIT",
            "SYSTEM_MANAGEMENT:DESKTOP_APP_CONFIG:CATEGORY:DELETE",
            "SYSTEM_MANAGEMENT:DESKTOP_APP_CONFIG:CATEGORY:DUPLICATE",
            "SYSTEM_MANAGEMENT:DESKTOP_APP_CONFIG:CATEGORY:ADD_VENDOR"
          ]
        })
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.createPermissionGroup).to.exist;
  });
});

Cypress.Commands.add(`queryPermission`, (access, site, permission) => {
  cy.request({
    url: site,
    method: 'POST',
    form: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query: `query {
        permissionGroups(first: 10, filter: { name: { in: ["${permission}"] } }) {
          totalCount
          edges {
            cursor
            node {
              id
              serialCode
              name
              permissions
            }
          }
        }
      }
      `,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.body.data.permissionGroups.totalCount).to.equal(1);
  });
});

//  GBG
Cypress.Commands.add(`updateGBG_Signup`, (access, site) => {
  // if (option === 'Disable GBG') {
  //   `enableGBG: false`;
  // } else if (option === 'Enable GBG Signup') {
  //   `enableGBG: true,
  //   gbgTrigger: "AFTER_SUCCESSFUL_SIGN_UP"`;
  // } else if (option === 'Enable GBG Withdrawal') {
  //   `enableGBG: true,
  //   gbgTrigger: "WITHDRAWAL",
  //   gbgWithdrawalAmount: 10`;
  // }

  const query = `mutation UpdateConfig($input: UpdateConfigInput!) {
    updateConfig(input: $input)
  }`;

  const variables = {
    input: {
      enableGBG: true,
      gbgTrigger: `AFTER_SUCCESSFUL_SIGN_UP`,
    },
  };

  cy.request({
    url: site,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query,
      variables,
    },
    failOnStatusCode: false,
  }).then((response) => {
    console.log(variables);
    console.log(response);
    expect(response.body.data.updateConfig).to.be.true;
  });
});

Cypress.Commands.add(`updateGBG_Withdrawal`, (access, site) => {
  const query = `mutation UpdateConfig($input: UpdateConfigInput!) {
    updateConfig(input: $input)
  }`;

  const variables = {
    input: {
      enableGBG: true,
      gbgTrigger: 'WITHDRAWAL',
      gbgWithdrawalAmount: 10,
    },
  };

  cy.request({
    url: site,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query,
      variables,
    },
    failOnStatusCode: false,
  }).then((response) => {
    console.log(variables);
    console.log(response);
    expect(response.body.data.updateConfig).to.be.true;
  });
});

Cypress.Commands.add(`disableGBG`, (access, site) => {
  const query = `mutation UpdateConfig($input: UpdateConfigInput!) {
    updateConfig(input: $input)
  }`;

  const variables = {
    input: {
      enableGBG: false,
    },
  };

  cy.request({
    url: site,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query,
      variables,
    },
    failOnStatusCode: false,
  }).then((response) => {
    console.log(variables);
    console.log(response);
    expect(response.body.data.updateConfig).to.be.true;
  });
});

// Enable Interim
Cypress.Commands.add(`enableInterim`, (access, site) => {
  const query = `mutation UpdateConfig($input: UpdateConfigInput!) {
    updateConfig(input: $input)
  }`;

  const variables = {
    input: {
      interimSafeGamblingPage: true,
      autoDetectUserCountryCode: true,
      optInChecked: false,
      tncChecked: false,
    },
  };

  cy.request({
    url: site,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query,
      variables,
    },
    failOnStatusCode: false,
  }).then((response) => {
    console.log(variables);
    console.log(response);
    expect(response.body.data.updateConfig).to.be.true;
  });
});

//Enable Loqate
Cypress.Commands.add(`enableLoqate`, (access, site) => {
  const query = `mutation UpdateConfig($input: UpdateConfigInput!) {
    updateConfig(input: $input)
  }`;

  const variables = {
    input: {
      enableLoqateIntegration: true,
    },
  };

  cy.request({
    url: site,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query,
      variables,
    },
    failOnStatusCode: false,
  }).then((response) => {
    console.log(variables);
    console.log(response);
    expect(response.body.data.updateConfig).to.be.true;
  });
});

//Enable Loqate
Cypress.Commands.add(`updateMemberStatus`, (access, site) => {
  const query = `mutation UpdateMember($id: ID!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input)
  }`;

  const variables = {
    input: {
      id: 'acc_4ed9e17116235b43b9d3367e74252a6f',
      input: {
        status: 'ENABLED',
        brandLinkagesUpdated: false,
      },
    },
  };

  cy.request({
    url: site,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: {
      query,
      variables,
    },
    failOnStatusCode: false,
  }).then((response) => {
    console.log(variables);
    console.log(response);
    // expect(response.body.data.updateConfig).to.be.true;
  });
});

export {};
