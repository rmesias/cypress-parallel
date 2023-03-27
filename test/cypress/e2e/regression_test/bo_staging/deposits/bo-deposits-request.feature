Feature: Desposits request feature

  Scenario: Admin view all members deposit transaction
    Given browser is at Deposit request Internal
    Then table of users for deposit request are shown

  Scenario: Payment deposit Hexopay method 
    Given browser is at Payment Method listing
    Then a "Hexopay" payment method exist
  
  Scenario: Payment deposit Manual Adjustment
    Given browser is at Payment Method listing
    Then a "Manual Adjustment" payment method exist
  
  