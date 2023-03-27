Feature: Login- Content

  Background: 
    Given user is login on BetVision

  Scenario: Verify user can see the following upon login
    Then user can see the list
      | list      |
      | Open Bets |
      | Balance   |
      | Inbox     |
  
  Scenario: When user click the deposit button
    When user click the "Deposit" button
    Then the modal for deposit will show

  Scenario: When user click the open bets tab
    When user click "Open Bets" tab
    Then it should be redirected to "sportsbook"

  Scenario: When user click the inbox tab
    When user click "Inbox" tab
    Then "Messages" modal will show

  Scenario: When user click the profile option name
    When user click the profile name
    Then "Transactions" column and "Personal Information" will show

  Scenario: When user click the logout button
    When user click the profile name
    And user click "Logout"
    Then "Successfully Logged out" will show