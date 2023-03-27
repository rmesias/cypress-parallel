@members
Feature: Members Tab

Scenario: Verify can see different tabs under member
    When admin click the "Members" tab
    Then tab must be shown on the table
      | value                   |
      | Member Management       |
      | Member Marker Management|
      | Label Management        |
      | Members Online          |
      | Profile Setting         |
      | Member Management Config|
      | Bulk Update             |

Scenario: Verify member reports contains sub menu items
    When admin click the "Members" tab
    Then "Member Reports" must also be shown and contains
      | value                         |
      | Member Access Audit History   |
      | Member IP Address Summary     |
      | IP Address Summary            |
      | Member Access Summary Report  |
      | Member Interaction Logs Report|
      | Member Session Duration       |