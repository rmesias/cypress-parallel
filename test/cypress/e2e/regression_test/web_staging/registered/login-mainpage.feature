Feature: BetVision Homepage (Login)

Background: 
    Given user is logged-in in the BetVision Homepage

Scenario: Verify user can see time options
    When User clicks Time dropdown
    Then User should see time options

Scenario: Verify user can select specific timezone
    When User selects specific timezone
    Then User should see time change

Scenario: Verify User can see the date in Betvision Homepage
    When User is in the Betvision Homepage
    Then User should see the date

Scenario: Verify user can be routed to Betvision Main Page
    When User clicks the Betvision Logo
    Then User should be routed to Betvision Main Page

Scenario Outline: Verify user can be routed to specific page
    When user clicks "<img>"
    Then user should be routed to "<link>"
      Examples:
        | img | link |
        | twitter.png | https://twitter.com/BetVisionsports |
        | email.png | staging.aonewallet.com/contact-us |
        | help.png | staging.aonewallet.com/help-centre |
        | visa.jpg | staging.aonewallet.com/ |
