Feature: Deposit button at the header 
This is to check that deposit modal fiekds exist

  Scenario: Member navigate to Deposit from Profile options
    When member click Deposit at the profile option
    Then Deposit modal is shown

  Scenario: Member balance are shown at Deposit modal header
    Given browser is at member Deposit modal
    Then member balance exist at the Deposit modal header
  
  Scenario: Amount text field exist at Deposit modal
    Given browser is at member Deposit modal
    Then amount text box exist and enabled

  Scenario: Hexopay credit card exist at Deposit modal
    Given browser is at member Deposit modal
    Then hexopay card exist

  Scenario: Deposit button
    Given browser is at member Deposit modal
    Then Deposit button exist

