Feature: Bonus information

  Scenario: Bonus information modal exist
    When member click Bonus Information at the profile option
    Then Bonus Information modal is shown

  Scenario: Active bonuses
    Given browser is at bonus information
		When member clicks Active bonuses
    Then Active Bonuses name, Amount and Date is shown

  Scenario: Bonus history
		Given browser is at bonus information
		When member clicks Bunos history
		Then Bonus history empty tab shown
