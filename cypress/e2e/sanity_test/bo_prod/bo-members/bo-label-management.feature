Feature: Members - Label Management

  Background: 
    Given admin is on the "Label Management" tab

  Scenario: Verify can see different tabs under Label management
    Then "No." must be shown on the table
    And "Label name" must be shown on the table
    And "Number of people" must be shown on the table
    And "Actions" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then "Quick Filter" must be shown on the left side
    And "Label Name" must be shown on the left side below quick filter

  Scenario: When clicking create new label the information must be shown
    When "Create new label" is click
    Then "Label name" must be shown
    And "Color" must be shown
    And "Description" must be shown

  Scenario: Verify admin can click save search button
    When admin clicks save search button
    Then admin should see save search modal

  Scenario: Verify admin can click search settings icon
    When admin clicks search settings icon
    Then admin should see search settings icon

  Scenario: Verify admin can click custom columns icon
    When admin clicks custom columns icon 
    Then admin should see the draggable custom columns dropdown options