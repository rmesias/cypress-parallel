Feature: Member views betvision tabs

   Scenario: user views sportsbook to help center login page
      When user clicks sportsbook tab 
      Then user should be routed to sportsbook page

   Scenario: user views casino to help center login page
      When user clicks casino tab 
      Then user should be routed to casino page

   Scenario: user views virtual sports to help center login page
      When user clicks virtual sports tab 
      Then user should be routed to virtual sports page

   Scenario: user views safe gaming to help center login page
      When user clicks safe gaming tab 
      Then user should be routed to safe gaming page

   Scenario: user views features to help center login page
      When user clicks features tab 
      Then user should be routed to features page

   Scenario: user views sportsbook to help center login page
      When user clicks betvision logo
      And user clicks rtp word link   
      Then user should be routed to rtp page

   Scenario: user views sportsbook to help center login page
      When user clicks betvision logo
      And user clicks help center word link
      Then user should be routed to help center page