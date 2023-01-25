Feature: Operators tab

  Scenario: Verify admin can click operators tab
    When admin click the "Operators" tab
    Then admin can see the "Account Management" and "Permission Group"
  
  Scenario: Verify can click account management
    When "Account Management" is click
    Then the "Account Management" block will be shown

  Scenario: Verify can click permission group
    When "Permission Group" is click
    Then the "Permission Group" block will be shown