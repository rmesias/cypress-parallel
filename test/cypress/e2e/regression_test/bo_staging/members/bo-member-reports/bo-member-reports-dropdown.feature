Feature: Members- Member Reports

  Scenario: Verify member reports contains sub menu items
    When admin click the "Members" tab
    Then "Member Reports" must also be shown and contains "Member Access Audit History"
    And  "Member Reports" must also be shown and contains "Member IP Address Summary"
    And  "Member Reports" must also be shown and contains "IP Address Summary"
    And  "Member Reports" must also be shown and contains "Member Access Summary Report"
    And  "Member Reports" must also be shown and contains "Member Interaction Logs Report"
    And  "Member Reports" must also be shown and contains "Member Session Duration"