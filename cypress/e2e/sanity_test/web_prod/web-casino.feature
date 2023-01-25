Feature: Casino 
Checked Casino if it exist at the header or does the button Bet here redirects to Casino.And does Casino games are playable.

  Scenario: Header Casino exist
    Then "Casino" exist in the header

  Scenario: Landing content contains sportsbook PLAY HERE button
    Then Casino PLAY HERE button exist

  Scenario: Header Casino tab redirect to Casino page
    When member clicks Casino tab
    Then member is redirected to Casino page

  Scenario: Landing page content Casino cta PLAY HERE redirect to Casino page
    When member clicks Casino PLAY HERE button
    Then member is redirected to Casino page

  # Scenario: Lunch sports book games

