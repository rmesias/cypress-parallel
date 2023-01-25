Feature: Web Site Information Help logout

Background: 
    Given User should be in Web Wallet landing page logout mode


Scenario Outline: User clicks and access specific sites
      When "<button>" is click
      Then user should be redirected to "<link>"
      Examples:
        |button        | link |
        |Rules         |rules|
        |Betting Rules |betting-rules|
        |Safe & Secure |safeandsecure|
        |Safer Gaming  |responsible-gambling|
        |Help Centre   |help-centre|