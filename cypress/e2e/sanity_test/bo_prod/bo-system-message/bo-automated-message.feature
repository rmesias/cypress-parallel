Feature: System Message - Automated Message

  Background: 
    Given admin is on the "Automated Message" tab

  Scenario: Verify can see different tabs under Automated Message
    Then "Deposit Request" must be shown and can be clicked
    And "Withdrawal Request" must be shown and can be clicked
    And "Promotions" must be shown and can be clicked
    And "VIP" must be shown and can be clicked
    And "Rebates" must be shown and can be clicked
    And "Affiliates Request" must be shown and can be clicked