Feature: Site status
  Checked web wallet status both end to end and api request

  Scenario: Make an XHR request for url: https://qa.nexiux.io/#/
    Then status code should be 200

  Scenario: Browsed wallet site url: https://qa.nexiux.io/#/
    When user browsed wallet WEB url: "https://qa.nexiux.io/#/"
    Then header tabs and button should exist:
    |navigationTabs |
    |Sportsbook     |
    |Casino         |
    |Virtual Sports |
    |Safer Gaming   |
    |Features       |
    And "Join" and "Login" exist
    And body CTA should exist
    |cta        |btn|
    |SPORTSBOOK |BET HERE|
    |CASINO     |PLAY HERE|
    |VIRTUAL SPORTS|BET HERE|
