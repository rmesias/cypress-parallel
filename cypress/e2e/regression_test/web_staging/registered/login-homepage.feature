Feature: BetVision Homepage

  Background: 
    Given admin is login on BetVision
  
  Scenario: Verify user can click bet here on sportsbook
    When "BET HERE" is click on sportsbook
    Then user should be routed to "sportsbook" page

  Scenario: Verify user can click play here on casino
    When "PLAY HERE" is click on casino
    Then user should be routed to "casino" page

  Scenario: Verify user can click bet here on virtual sports
    When "BET HERE" is click on virtual sports
    Then user should be routed to "virtual-sports" page

  Scenario: Verify user can click safer gaming 
    When user click safer gaming
    Then user should be routed to "responsible-gambling" page

  Scenario: Verify user should see the site information
    Then user should see the "SITE INFORMATION" section
  
  Scenario: Verify user should see the help
    Then user should see the "HELP" section

  Scenario Outline: Verify user can click specific icon
    When user click "<icon>"
    Then "<href>" should contains the link of the desired page
      Examples:
          | icon | href |
          | gamestop | https://www.gamstop.co.uk/ |
          | begambleaware | https://www.begambleaware.org/ |
          | ibas  | https://www.ibas-uk.com/  |
          | gambling-commission | https://www.gamblingcommission.gov.uk/public-register/business/detail/38898 |
          | gamecare  | https://www.gamcare.org.uk/ |
