Feature: Reports - Balance Transaction Records

  Background: 
    Given admin is on the "Balance Transaction Records" tab

  Scenario: Verify can see different tabs under Balance Transaction Records
    Then "Serial Code" must be shown on the table
    And "Affiliates" must be shown on the table
    And "Member" must be shown on the table
    And "Platform ID" must be shown on the table
    And "Amount" must be shown on the table
    And "Balance" must be shown on the table
    And "Balance adjustment" must be shown on the table
    And "Type" must be shown on the table
    And "Remarks" must be shown on the table
    And "Unique Transaction ID" must be shown on the table
    And "Initiator" must be shown on the table
    And "Date / Time Created" must be shown on the table
    And "Balance Adjustment Remarks" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then "Quick Filter" must be shown on the left side
    And "Serial Code" must be shown on the left side
    And "Username" must be shown on the left side
    And "Brand" must be shown on the left side
    And "Brand ID" must be shown on the left side
    And "Platform ID" must be shown on the left side
    And "Amount" must be shown on the left side
    And "Manual Balance Adjustment" must be shown on the left side
    And "Type" must be shown on the left side
    And "Remarks" must be shown on the left side
    And "Unique Transaction IDs" must be shown on the left side
    And "Initiator" must be shown on the left side
    And "Date / Time Created" must be shown on the left side
    And "Balance Adjustment Remarks" must be shown on the left side

  Scenario: When select timezone is click
    When admin click " Select Timezone"
    Then the "Select Timezone" modal will show