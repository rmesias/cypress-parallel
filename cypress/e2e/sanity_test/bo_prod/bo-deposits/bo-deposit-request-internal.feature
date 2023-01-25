Feature: Deposit Requests Internal tab

  Background: 
    Given admin is on the "Deposit Requests(Internal)" tab

  Scenario: Verify can see different tabs under Deposit Requests(Internal)
    Then "Serial Code" must be shown on the table
    And "Affiliate" must be shown on the table
    And "Account Username" must be shown on the table
    And "Platform ID" must be shown on the table
    And "Brand ID" must be shown on the table
    And "Affiliate ID" must be shown on the table
    And "VIP Tier" must be shown on the table
    And "Member Marker" must be shown on the table
    And "Payment Method" must be shown on the table
    And "Hexopay Transaction UID" must be shown on the table
    And "Payment Account Number" must be shown on the table
    And "Amount(£)" must be shown on the table
    And "Status" must be shown on the table
    And "Labels/Remarks" must be shown on the table
    And "Request Date / Time" must be shown on the table
    And "Processing Time" must be shown on the table
    And "Actions" must be shown on the table
  
  Scenario: Search row must be shown on the left side
    Then Quick Filter must be shown on the left side
    And "Serial Code" must be shown on the left side
    And "Account" must be shown on the left side
    And "VIP Level" must be shown on the left side
    And "Member Marker" must be shown on the left side
    And "Payment Method Type" must be shown on the left side
    And "Deposit Amount" must be shown on the left side
    And "Status" must be shown on the left side
    And "Request date" must be shown on the left side
    And "Operator" must be shown on the left side
    And "Brand ID" must be shown on the left side
    And "Platform ID" must be shown on the left side

  Scenario: Verify admin can click refresh icon
    When admin clicks refresh icon 
    Then table should be refreshed

  Scenario: Verify admin can click custom columns icon
    When admin clicks custom columns icon 
    Then admin should see the draggable custom columns dropdown options
  
  Scenario: Verify admin can click download csv icon
    When admin clicks download csv icon
    Then download csv modal will show

  Scenario: Verify admin can click save search button
    When admin clicks save search button
    Then admin should see save search modal

  Scenario: Verify admin can click search settings icon
    When admin clicks search settings icon
    Then admin should see search settings icon