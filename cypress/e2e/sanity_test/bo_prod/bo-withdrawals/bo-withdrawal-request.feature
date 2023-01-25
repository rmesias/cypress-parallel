Feature: Withdrawal - Withdrawal Requests

  Background: 
    Given admin is on the "Withdrawal Requests" tab

  Scenario: Verify can see different tabs under Withdrawal Requests
    Then "Serial Code" must be shown on the table
    And "Member Account" must be shown on the table
    And "Brand ID" must be shown on the table
    And "Platform ID" must be shown on the table
    And "VIP Tier" must be shown on the table
    And "Member Marker" must be shown on the table
    And "Fee Deduction" must be shown on the table
    And "Compliance Check" must be shown on the table
    And "Withdrawal amount(£)" must be shown on the table
    And "Hexopay Transaction UID" must be shown on the table
    And "Withdrawal Sources" must be shown on the table
    And "Status" must be shown on the table
    And "Labels/Remarks" must be shown on the table
    And "Request Date / Time" must be shown on the table
    And "Elapsed Time" must be shown on the table
    And "Processing Time" must be shown on the table
    And "Actions" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then "Quick Filter" must be shown on the left side
    And "Serial Code" must be shown on the left side
    And "Account" must be shown on the left side
    And "VIP Level" must be shown on the left side
    And "Member Marker" must be shown on the left side
    And "Fee Deduction" must be shown on the left side
    And "Compliance Check" must be shown on the left side
    And "Payout Amount" must be shown on the left side
    And "Payment source" must be shown on the left side
    And "Status" must be shown on the left side
    And "Processing Time" must be shown on the left side
    And "Request date" must be shown on the left side
    And "Brand ID" must be shown on the left side
    And "Platform ID" must be shown on the left side

  Scenario: Verify admin can click save search button
    When admin clicks save search button
    Then admin should see save search modal

  Scenario: Verify admin can click search settings icon
    When admin clicks search settings icon
    Then admin should see search settings icon

  Scenario: Verify admin can click refresh icon
    When admin clicks refresh icon 
    Then table should be refreshed

  Scenario: Verify admin can click custom columns icon
    When admin clicks custom columns icon 
    Then admin should see the draggable custom columns dropdown options

  Scenario: Verify admin can click download csv icon
    When admin clicks download csv icon
    Then download csv modal will show