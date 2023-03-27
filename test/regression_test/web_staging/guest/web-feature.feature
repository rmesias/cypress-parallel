Feature: BetVision Feature

  Background: 
    Given admin click on "Features" tab

  Scenario: Verify user can see the feature page
    Then user should be routed to "features" page

  Scenario Outline: User click specific button and its redirected to
    When "<button>" is click
    Then it is redirected to "<link>"
      Examples:
        | button | link |
        # | Today's Events  | sportsbook |
        | Help Centre | help-centre |

  Scenario: User click time
    When user click time
    Then user should see time options

  Scenario: When user click read more
    When user clicks "Read More" button
    Then user should be routed to "features/acca-boost" page


  