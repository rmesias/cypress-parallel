Feature: Reports tab

  Scenario Outline: Verify admin can click reports tab
    When admin click the "Reports" tab
    Then admin can see the "<menu-item>"
    Examples:
        | menu-item                     |
        | Daily Operating Report        |
        | Member Bet Records            |
        | Balance Transaction Records   |
        | Rebates Reports               |
        | Balance Service Record Report |
        | Member Summary Report         |
        | EU Reports                    |