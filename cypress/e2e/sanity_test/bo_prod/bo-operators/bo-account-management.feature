Feature: Operators - Account Management

  Background: 
    Given admin is on the "Account Management" tab

  Scenario: Verify can see different tabs under Account management
    Then "Account" must be shown on the table
    And "Permission Groups" must be shown on the table
    And "Last login date" must be shown on the table
    And "Registration Date" must be shown on the table
    And "Status" must be shown on the table
    And "Actions" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then Quick Filter must be shown on the left side
    And "Operator" must be shown on the left side
    And "Permission Group" must be shown on the left side
    And "Registration Date" must be shown on the left side
    And "Last login date" must be shown on the left side
    And "Status" must be shown on the left side

  Scenario: When clicking new operator the information must be shown
    When "New operator" is click
    Then "Username" must be shown
    And "Real Name" must be shown
    And "Mobile Number" must be shown
    And "Email" must be shown
    And "Gender" must be shown
    And "Password" must be shown
    And "Permission Groups" must be shown
    And "Notes" must be shown
    And "Status" must be shown

  Scenario: Verify admin can click save search button
    When admin clicks save search button
    Then admin should see save search modal

  Scenario: Verify admin can click search settings icon
    When admin clicks search settings icon
    Then admin should see search settings icon

  Scenario: Verify admin can click custom columns icon
    When admin clicks custom columns icon
    Then admin should see the draggable custom columns dropdown options