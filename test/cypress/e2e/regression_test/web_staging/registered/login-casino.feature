Feature: BetVision Login- Casino

  Background: 
    Given admin click on "Casino" tab

  Scenario: Verify user can see the casino page
    Then user should be routed to "casino" page

  Scenario Outline: User click specific button and its redirected to
    When "<button>" is click
    Then it is redirected to "<link>"
      Examples:
        | button | link |
        | RTP | rtp |
        | Help Centre | help-centre |
  
  Scenario: User click time
    When user click time
    Then user should see time options

  Scenario Outline: User click the filter
    When user click "<filter>" filter 
    Then "<filter>" should contains text
      Examples:
        | filter  |
        | Most Popular  |
        | Newest  |
        | A-Z |
