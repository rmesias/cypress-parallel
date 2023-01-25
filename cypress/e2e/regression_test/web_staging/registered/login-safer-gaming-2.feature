Feature: BetVision Login- Safer Gaming 2

  Background: 
    Given admin click on "Safer Gaming" tab
  
 Scenario: User click Support
    When user click "Support"
    Then user should see list of support
      | list  |
      | Support & Tips |
      | Underage Gambling |
      | Helpful Organisations |

  Scenario Outline: User click safer gaming lists
    When user click "Safer Gaming"
    And user click safer gaming "<list>"
    Then it is redirected to "<url>" 
      Examples:
        | list  | url |
        | Home  | safer-gaming  |
        | Understanding Gambling| understanding-gambling  |
        | Problem Gambling  | problem-gambling  |
        | Play Safe Tools | play-safe |
        | Social Responsibility | social-responsible  |

  Scenario Outline: User click play safe lists
    When user click "Play Safe"
    And user click play safe "<list>"
    Then it is redirected to "<url>" 
      Examples:
        | list  | url |
        | Track Your Activity | track-your-activity |
        | Limit Your Gaming | limit-your-gaming |
        | Budget Calculator | budget-calculator |
        | Time Out  | time-out  |
        | Self Exclusion  | self-exclusion  |