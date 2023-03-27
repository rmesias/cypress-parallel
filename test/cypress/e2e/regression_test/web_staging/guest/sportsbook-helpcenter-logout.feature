Feature: guest access

   Scenario: user views sportsbook logout page
    When user clicks sportsbook tab 
    Then user should be routed to sportsbook page

  Scenario: user views casino logout page
    When user clicks casino tab 
    Then user should be routed to casino page

  Scenario: user views virtual sports logout page
    When user clicks virtual sports tab 
    Then user should be routed to virtual sports page

  Scenario: user views safe gaming logout page
    When user clicks safe gaming tab 
    Then user should be routed to safe gaming page

  Scenario: user views features logout page
    When user clicks features tab 
    Then user should be routed to features page

  Scenario: user views rtp logout page
    When user clicks rtp word link
    Then user should be routed to rtp page

  Scenario: user views help center logout page
    When user clicks help center word link
    Then user should be routed to help center page