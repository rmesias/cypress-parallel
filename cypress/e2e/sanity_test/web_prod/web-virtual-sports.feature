Feature: Virtual Sports
Checked Virtual Sports  if it exist at the header or does the button Bet here redirects to Virtual Sports.And does sportbook games are playable.

  Scenario: Header Virtual Sports exist
    Then "Virtual Sports" exist in the header

  Scenario: Landing content contains Virtual Sports BET HERE button
    Then Virtual Sports BET HERE button exist

  Scenario: Header Virtual Sports tab redirect to Virtual Sports page
    When member clicks Virtual Sports tab
    Then member is redirected to Virtual Sports page

  Scenario: Landing page content Virtual Sports cta BET HERE redirect to Virtual Sports page
    When member clicks Virtual Sports BET HERE button
    Then member is redirected to Virtual Sports page

  # Scenario: Lunch sports book games

