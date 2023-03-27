Feature: BetVision- Login Homepage Menu

  Background: 
    Given user click the profile name

  Scenario Outline: User navigate to .. modal
    When user click "<menu>"
    Then "<menu>" modal should appear
      Examples:
        | menu  | 
        | Balance |
        | Betting History |
        | Games History | 
        | Transaction History | 
        | Bonus Information | 
        | Personal Details  | 
        | Safer Gaming  |
        | Limitations |
  
  Scenario: User navigate to deposit menu
    When user click "Deposit"
    Then deposit modal should appear

  Scenario: User navigate to withdrawal menu
    When user click "Withdraw"
    Then withdrawal modal should appear

  Scenario: When user navigate to open bets menu
    When user click "Open Bets"
    Then it should be redirected to "sportsbook"
  
  Scenario: When user navigate to account verification menu
    When user click "Account Verification"
    Then image of account is verified will show

  Scenario: When user navigate to reality check menu
    When user click "Reality Check"
    Then reality check modal should appear