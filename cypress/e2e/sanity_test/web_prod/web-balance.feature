Feature: Balance Modal

  Scenario: Member navigate to balance
    When member click balance at the profile option
    Then Balance modal is shown

  Scenario: Member balance Withdrawable exist
    Given browser is at member balance modal 
    Then withdrawable fields and amount exist
  
  Scenario: Member balance Bunos exist
    Given browser is at member balance modal 
    Then bonus fields and amount exist

  Scenario: Member balance Total Balance exist
    Given browser is at member balance modal 
    Then Total Balance fields and amount exist

  Scenario Outline: Member can open deposit from by clicking <label> <type>
    Given browser is at member balance modal 
    And user clicks "<label>" "<type>"
    Then Deposit form is shown
    And balance is also displayed
    Examples:
      |label    |type   |
      |Deposit  |button |
      |+ Deposit|link   |