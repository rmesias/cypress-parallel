Feature: Withdrawals tab

  Scenario Outline: Verify admin can click withdrawals tab
    When admin click the "Withdrawals" tab
    Then admin can see the "<menu-item>"
    Examples:
        | menu-item                     |
        | Withdrawal Requests           |
        | Withdrawal Methods            |
        | 3rd Party Withdrawal Providers|
        | Compliance Check              |