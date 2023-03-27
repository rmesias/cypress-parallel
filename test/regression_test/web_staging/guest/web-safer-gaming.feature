Feature: BetVision Feature

  Background: 
    Given admin click on "Safer Gaming" tab
  
  Scenario: Verify user can see the safer gaming page
    Then user should be routed to "responsible-gambling" page

  Scenario Outline: User click specific button and its redirected to
    When "<button>" is click
    Then it is redirected to "<link>"
      Examples:
        | button | link |
        | Today's Events  | sportsbook |
        | Features  | features  |
        | Help Centre | help-centre |

  Scenario: User click time
    When user click time
    Then user should see time options

  Scenario: User should see today's date
    Then user should see the date today
  
  Scenario: User click Safer Gaming
    When user click "Safer Gaming"
    Then user should see list of safer gaming
      | list  |
      | Home  |
      | Understanding Gambling|
      | Problem Gambling  |
      | Play Safe Tools |
      | Social Responsibility |
  
  Scenario: User click Play safe
    When user click "Play Safe"
    Then user should see list of play safe
      | list  |
      | Track Your Activity |
      | Limit Your Gaming |
      | Budget Calculator |
      | Time Out  |
      | Self Exclusion  |

  Scenario Outline: User click support lists
    When user click "Support"
    And user click support "<list>"
    Then it is redirected to "<url>" 
      Examples:
        | list  | url |
        | Support & Tips |  support |
        | Underage Gambling | underage-gambling |
        | Helpful Organisations | helpful-organisations |