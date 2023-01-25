Feature: Reality Checked

  Scenario: Reality Checked modal exist
    When member click Reality Checked at the profile option
    Then Reality Checked modal is shown
  
  Scenario: Elapsed time should start at 00 seconds after login
    Given browser is at member Reality check modal
    Then Elapsed time should start at 0 minutes and 0 seconds
  
  Scenario: Betting History
    Given browser is at member Reality check modal
    Then Betting history cta exist

  Scenario: Logout
    Given browser is at member Reality check modal
    Then Logout cta exist

  Scenario Outline: Reality checked options <elapsedTime>
    Given browser is at member Reality check modal
    Then elapse time will can setted to "<elapsedTime>"
        Examples:
            |elapsedTime  |
            |15 mins      |
            |30 mins      |
            |45 mins      |
            |60 mins      |