Feature: Profile settings Limitation

  Scenario: Limitation modal
    When member click Limitation at the profile option
    Then Limitation modal is shown

  Scenario: Limitations 
    Given browser is at member Profile settings Limitation modal
    Then Limitations month, amount and Confirm button exist