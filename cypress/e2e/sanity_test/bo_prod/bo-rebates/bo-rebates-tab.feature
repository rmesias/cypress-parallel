Feature: Rebates Tab

  Background: 
    Given admin is on the "Rebates" tab

  Scenario: Verify can see different tabs under Rebates
    Then "ID" must be shown on the table
    And "Rebate Group Name (level)" must be shown on the table
    And "To Do List" must be shown on the table
    And "Validity" must be shown on the table
    And "No. of Members" must be shown on the table
    And "Qualifying VIP" must be shown on the table
    And "Status" must be shown on the table
    And "Actions" must be shown on the table
  
  Scenario: Search row must be shown on the left side
    Then "Quick Filter" must be shown on the left side
    And "Group name" must be shown on the left side
    And "Qualifying VIP" must be shown on the left side
    And "Excluded Member Markers" must be shown on the left side
    And "Validity date" must be shown on the left side
    And "Status" must be shown on the left side
  
  Scenario: When clicking add rebate group
    When admin click "Add new rebate group"
    Then "Rebate settings" will show
    And "Payout settings" will show
    And "Rebate group" will show

  Scenario: Verify admin can click save search button
    When admin clicks save search button
    Then admin should see save search modal

  Scenario: Verify admin can click search settings icon
    When admin clicks search settings icon
    Then admin should see search settings icon

  Scenario: Verify admin can click download csv icon
    When admin clicks download csv icon
    Then download csv modal will show