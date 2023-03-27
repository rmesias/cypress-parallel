Feature: Withdrawals Tab

Scenario: Verify can see different tabs under withdrawals
    When admin click the "Withdrawals" tab
    Then tab must be shown on the table
      | tab                           |
      | Withdrawal Requests           |
      | Withdrawal Methods            |
      | 3rd Party Withdrawal Providers|
      | Compliance Check              |