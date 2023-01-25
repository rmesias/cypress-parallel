Feature: Safer Gaming
Checked Safer Gaming if it exist at the header or does the button Bet here redirects to Safer Gaming.And does Safer Gaming games are playable.

  Scenario: Header Safer Gaming exist
    Then "Safer Gaming" exist in the header

  Scenario: Landing content contains Safer Gaming cta image link
    Then Safer Gaming cta link image link

  Scenario: Landing footer contains Safer Gaming cta link
    Then Footer Safer Gaming cta link exist

  Scenario: Header Safer Gaming tab redirect to Safer Gaming page
    When member clicks Safer Gaming tab
    Then member is redirected to Safer Gaming page

  Scenario: Landing page content Safer Gaming cta image link redirect to Safer Gaming page
    When member clicks Safer Gaming cta image link
    Then member is redirected to Safer Gaming page

  Scenario: Landing page content footer Safer Gaming cta link redirect to Safer Gaming page
    When member clicks footer Safer Gaming cta link
    Then member is redirected to Safer Gaming page

  # Scenario Outline: Member navigates to Safer gaming <list>
  #   Given browser is at safer gaming
  #   And member clicks Safer gaming menu
  #   And clicks "<list>"
  #   Then user is redirected to "<listPage>"
  #   And "<listPage>" content should be displayed with status code 200
  #     Examples:
  #     |list                  |listPage|
  #     |Home                  |https://qa.nexiux.io/responsible-gambling/safer-gaming|
  #     |Understanding Gambling|https://qa.nexiux.io/responsible-gambling/understanding-gambling|
  #     |Problem Gambling      |https://qa.nexiux.io/responsible-gambling/problem-gambling|
  #     |Play Safe Tools       |https://qa.nexiux.io/responsible-gambling/play-safe|
  #     |Social Responsibility |https://qa.nexiux.io/responsible-gambling/social-responsible|
  
  # Scenario Outline: Member navigates to Play safe <list>
  #   Given browser is at safer gaming
  #   When member clicks Play safe menu
  #   And clicks "<list>"
  #   Then user is redirected to "<listPage>"
  #   And "<listPage>" content should be displayed with status code 200
  #     Examples:
  #     |list                  |listPage|
  #     |Track Your Activity   |https://qa.nexiux.io/responsible-gambling/track-your-activity|
  #     |Limit Your Gaming     |https://qa.nexiux.io/responsible-gambling/limit-your-gaming|
  #     |Budget Calculator     |https://qa.nexiux.io/responsible-gambling/budget-calculator|
  #     |Time Out              |https://qa.nexiux.io/responsible-gambling/time-out|
  #     |Self Exclusion        |https://qa.nexiux.io/responsible-gambling/self-exclusion|
   
  # Scenario Outline: Member navigates to Support <list>
  #   Given browser is at safer gaming
  #   When member clicks Support menu
  #   And clicks "<list>"
  #   Then user is redirected to "<listPage>"
  #   And "<listPage>" content should be displayed with status code 200
  #     Examples:
  #     |list                  |listPage|
  #     |Support & Tips        |https://qa.nexiux.io/responsible-gambling/support|
  #     |Underage Gambling     |https://qa.nexiux.io/responsible-gambling/underage-gambling|
  #     |Helpful Organisations |https://qa.nexiux.io/responsible-gambling/helpful-organisations|

  # Scenario: FIND OUT HOW YOU CAN GAMBLE SAFELY CTA redirect to its designated page
  #   When member clicks Safer Gaming tab
  #   Then cta's from FIND OUT HOW YOU CAN GAMBLE SAFELY redirects to pages below
  #     |page|
  #     |/understanding-gambling|
  #     |/track-your-activity   |
  #     |/limit-your-gaming     |
  #     |/problem-gambling      |
  #     |/support               |
     

