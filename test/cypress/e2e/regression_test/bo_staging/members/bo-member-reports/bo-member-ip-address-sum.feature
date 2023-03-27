Feature: Member Reports | IP Address Summary

  Background: 
    Given admin is on the "IP Address Summary" tab

  Scenario: Verify can see different tabs under IP Address Summary
    Then "IP Address" must be shown on the table
    And "IP Address Location" must be shown on the table
    And "Last Date/Time IP Address was Used" must be shown on the table
    And "Members Total Count" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then Quick Filter must be shown on the left side
    And "IP Address" must be shown on the left side
    And "Total Count" must be shown on the left side

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