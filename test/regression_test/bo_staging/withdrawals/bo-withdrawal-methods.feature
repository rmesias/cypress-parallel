Feature: Withdrawal - Withdrawal Methods

  Background: 
    Given admin is on the "Withdrawal Methods" tab

  Scenario: Verify can see different tabs under Withdrawal Methods
    Then "Withdrawal Method Name" must be shown on the table
    And "Withdrawal Sources" must be shown on the table
    And "Provider" must be shown on the table
    And "Withdrawal Method" must be shown on the table
    And "Bank Name / Nickname" must be shown on the table
    And "Status" must be shown on the table
    And "Withdrawal Method Remark" must be shown on the table
    And "Action" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then "Quick Filter" must be shown on the left side
    And "Withdrawal method" must be shown on the left side
    And "Payment source" must be shown on the left side
    And "Payment Method Type" must be shown on the left side
    And "Provider" must be shown on the left side
    And "Bank" must be shown on the left side
    And "Nickname" must be shown on the left side
    And "Status" must be shown on the left side
  
  Scenario: When Add New Withdrawal Method is click
    When "Add New Withdrawal Method" is click
    Then the "Add New Withdrawal Method" modal will show

  Scenario: Verify admin can click save search button
    When admin clicks save search button
    Then admin should see save search modal

  Scenario: Verify admin can click search settings icon
    When admin clicks search settings icon
    Then admin should see search settings icon

  Scenario: Verify admin can click custom columns icon
    When admin clicks custom columns icon 
    Then admin should see the draggable custom columns dropdown options
  
  Scenario: Verify admin can click download csv icon
    When admin clicks download csv icon
    Then download csv modal will show