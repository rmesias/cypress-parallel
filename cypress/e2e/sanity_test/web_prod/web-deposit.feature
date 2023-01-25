Feature: Deposit button at the header 
This is to check whether the deposit button exist at the header and could open deposit modal

  Scenario: Deposit button exist at the header
    Then "Deposit" button exist at the page header
  
  Scenario: Member clicks Deposit button
    When member clicks "Deposit" button
    Then Deposit modal show up