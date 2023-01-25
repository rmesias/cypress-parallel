Feature: Member Profile option

  Scenario: Member user should show up at the the header
    Then username exist at the header
  
  Scenario Outline: Account transactions <options> exist
    When member clicks username
    Then account transactions "<options>" exist
    Examples:
    |options     |
    |Balance     |
    |Deposit     |
    |Withdraw    |

  Scenario Outline: Transactions History <history> exist
    When member clicks username
    Then transaction history "<history>" exist
    Examples:
    |history     |
    |Open Bets   |
    |Betting History|
    |Games History  |
    |Transaction History|
    |Bonus Information|

  Scenario: Personal Informations list exist
    When member clicks username
    Then personal information list exist
    |personalInfo|
    |Account Verification|
    |Personal Details    |
    |Reality Check       |
    |Safer Gaming        |
    |Limitations         |
    |Logout              |
    
