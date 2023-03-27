@members
Feature: Members - Member Marker Management

  Background: 
    Given admin is on the "Member Marker Management" tab

  Scenario: Verify can see different tabs under Member Marker management
    Then "Name" must be shown on the table
    And "No. of Members" must be shown on the table
    And "Default" must be shown on the table
    And "Status" must be shown on the table
    And "Actions" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then Quick Filter must be shown on the left side
    And "Member Marker" must be shown on the left side
    And "Status" must be shown on the left side

  Scenario: When clicking new member marker the information must be shown
    When "New Member Marker" is click
    Then "Member Marker Name" must be shown
    And "Color" must be shown
    And "Default" must be shown
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