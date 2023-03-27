Feature: BetVision Homepage

  Background: 
    Given admin click on "Sportsbook" tab

  Scenario Outline: User click specific button and its redirected to
    When "<button>" is click
    Then it is redirected to "<link>"
      Examples:
        | button | link |
        | Today's Events  | sportsbook |
        | Features  | features  |
        | Help Centre | help-centre |

  Scenario: User should see Top Leagues
    Then user should see List of Countries in Top Leagues panel
  
  Scenario: User click specific top league option
    When user click specific option
    Then panel change matching specific league option

  Scenario: User should see the betslip 
    Then the "BETSLIP" table should be seen

  Scenario Outline: User should see the sports icons
    When user click the <no.>"<icon>"
    Then it is redirected to "<link>"
      Examples:
          | no.| icon | link |
          | 1  | Live | live  |
          | 2  | Football | sport/66 |
          | 3  | American Football  | sport/75/ |
          | 4  | Basketball | sport/67/ |
          | 5  | Tennis | sport/68/ |
          | 6  | Motorsport | /sport/103/ |
          | 7  | All sports | allsports |

  Scenario: User should see Menu list
    Then menu column should be visible

  Scenario: User should see Live Now 
    Then live now column should be visible

  # Scenario: User click View all events
  #   When user click the "View all events"
  #   Then user should be routed to "upcoming" panel
