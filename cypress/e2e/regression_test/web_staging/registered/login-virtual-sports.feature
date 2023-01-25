Feature: BetVision Login- Virtual Sports

  Background: 
    Given admin click on "Virtual Sports" tab

  Scenario: Verify user can see the virtual sports page
    Then user should be routed to "virtual-sports" page

  Scenario Outline: User click specific button and its redirected to
    When "<button>" is click
    Then it is redirected to "<link>"
      Examples:
        | button | link |
        | Today's Events  | sportsbook |
        | Help Centre | help-centre |

  Scenario: User click time
    When user click time
    Then user should see time options