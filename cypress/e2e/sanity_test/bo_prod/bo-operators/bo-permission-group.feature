Feature: Operators - Permission group

  Background: 
    Given admin is on the "Permission Group" tab
  
  Scenario: Verify can see different tabs under Permission Group
    Then "Serial Code" must be shown first column of the table
    And "Date/Time updated" must be shown on the table
    And "Name" must be shown on the table
    And "Permissions" must be shown on the table
    And "Action" must be shown on the table

  Scenario Outline: Search row must be shown on the left side
    Then Quick Filter must be shown on the left side
    And "Permission Group" must be shown on the left side
    And "Serial Code" must be shown on the left side
    And "Permission" must be shown on the left side
    And "Date/Time updated" must be shown on the left side

  Scenario Outline: Clicking new permission group the permission must be shown
    When "New permission group" is click
    Then "<tab>" must be shown
    And "<tab>" is clickable
    Examples:
        | tab               |
        | Dashboard         |
        | Operators         |
        | Members           |
        | Affiliates        |
        | Deposits          |
        | Withdrawals       |
        | Promo             |
        | VIP               |
        | Rebates           |
        | Reports           |
        | System Management |
        | System Messages   |

