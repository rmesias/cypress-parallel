Feature: Deposits - Payment Method Listing

  Background: 
    Given admin is on the "Payment Method Listing" tab

  Scenario: Verify can see different tabs under Payment Method Listing
    Then "Payment method name" must be shown on the table
    And "Payment source" must be shown on the table
    And "Provider" must be shown on the table
    And "Payment Method Type" must be shown on the table
    And "Bank Name / Nickname" must be shown on the table
    And "Current Accumulation" must be shown on the table
    And "Daily deposit limit" must be shown on the table
    And "Status" must be shown on the table
    And "Remarks" must be shown on the table
    And "Action" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then "Quick Filter" must be shown on the left side
    And "Payment Method" must be shown on the left side
    And "Payment source" must be shown on the left side
    And "Payment Method Type" must be shown on the left side
    And "Provider" must be shown on the left side
    And "Bank" must be shown on the left side
    And "Current Accumulation" must be shown on the left side
    And "Daily limit" must be shown on the left side
    And "Status" must be shown on the left side
  
  Scenario: When new payment gateway is click
    When "New payment gateway" is click
    Then the "Add payment gateway" modal will show

  Scenario: Verify admin can click save search button
    When admin clicks save search button
    Then admin should see save search modal

  Scenario: Verify admin can click search settings icon
    When admin clicks search settings icon
    Then admin should see search settings icon

  Scenario: Verify admin can click payment methods config
    When admin clicks payment methods config
    Then admin should see payment methods config modal

  Scenario: Verify admin can click deposit source config
    When admin clicks deposit source config
    Then admin should see deposit source config modal

  Scenario: Verify admin can click refresh icon
    When admin clicks refresh icon 
    Then table should be refreshed

  Scenario: Verify admin can click custom columns icon
    When admin clicks custom columns icon 
    Then admin should see the draggable custom columns dropdown options
  
  Scenario: Verify admin can click download csv icon
    When admin clicks download csv icon
    Then download csv modal will show
  
