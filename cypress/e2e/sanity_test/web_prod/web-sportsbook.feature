Feature: Sportsbook 
Checked Sportsbook if it exist at the header or does the button Bet here redirects to Sportsbook.And does sportbook games are playable.

  Scenario: Header sportsbooks exist
    Then "Sportsbook" exist in the header

  Scenario: Landing content contains sportsbook BET HERE button
    Then Sportsbook BET HERE button exist

  Scenario: Header sportsbook tab redirect to sportsbook page
    When member clicks Sportsbook tab
    Then member is redirected to Sportsbook page

  Scenario: Landing page content sportsbook cta BET HERE redirect to sportsbook page
    When member clicks Sportsbook BET HERE button
    Then member is redirected to Sportsbook page

  # Scenario: Lunch sports book games

