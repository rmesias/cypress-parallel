Feature: VIP tab

  Background: 
    Given admin is on the "VIP" tab

  Scenario Outline: Verify can see different tabs under vip
    Then "<tab>" must be shown on the table
    Examples:
      | tab                   |
      | ID                    |
      | VIP Programme Name	  |
      | Primary               |
      | Members               |
      | Effective Date Range	|
      | Status                |
      | Tiers                 |
      | Actions               |
  
  Scenario: Search row must be shown on the left side
    Then Quick Filter must be shown on the left side
    And VIP Programme Name must be shown on the left side
    And Status must be shown on the left side

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
