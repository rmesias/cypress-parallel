@members
Feature: Members tab

  Scenario: Verify admin can click operators tab
    When admin click the "Members" tab
    Then admin can see the "Member Management"
    And admin can see the "Member Marker Management"
    And admin can see the "Label Management"
    And admin can see the "Members Online"
    And admin can see the "Profile Setting"
    And admin can see the "Member Management Config"
    And admin can see the "Bulk Update"

  Scenario: Verify member reports contains sub menu items
    When admin click the "Members" tab
    Then "Member Reports" must also be shown and contains "Member Access Audit History"
    And  "Member Reports" must also be shown and contains "Member IP Address Summary"
    And  "Member Reports" must also be shown and contains "IP Address Summary"
    And  "Member Reports" must also be shown and contains "Member Access Summary Report"
    And  "Member Reports" must also be shown and contains "Member Interaction Logs Report"
    And  "Member Reports" must also be shown and contains "Member Session Duration"