Feature: Affiliates - Affiliate Request

  Background: 
    Given admin is on the "Affiliate Request" tab

  Scenario: Verify can see different tabs under Affiliate Request
    Then "Request ID" must be shown on the table
    And "Username" must be shown on the table
    And "Real Name" must be shown on the table
    And "Affiliate Programme" must be shown on the table
    And "Status" must be shown on the table
    And "VIP" must be shown on the table
    And "Request date" must be shown on the table
    And "Processor" must be shown on the table
    And "Time Processed" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then Quick Filter must be shown on the left side
    And "Programme Name" must be shown on the left side
    And "Continue" must be shown on the left side
    And "Status" must be shown on the left side
    And "Tiers" must be shown on the left side
    And "Default Programme" must be shown on the left side
    And "Negative Carry" must be shown on the left side
    And "Members" must be shown on the left side


  Scenario: Verify admin can click refresh icon
    When admin clicks refresh icon 
    Then table should be refreshed

  Scenario: Verify admin can click custom columns icon
    When admin clicks Custom Columns icon 
    Then admin should see the draggable Custom Columns dropdown options
  
  Scenario: Verify admin can click download csv icon
    When admin clicks download csv icon
    Then download csv modal will show

  Scenario: Verify admin can click more actions button
    When admin clicks more actions icon
    Then admin should see more actions dropdown options

   Scenario: Verify admin can click save search button
    When admin clicks save search button
    Then admin should see save search modal

   Scenario: Verify admin can click search settings icon
    When admin clicks search settings icon
    Then admin should see search settings icon