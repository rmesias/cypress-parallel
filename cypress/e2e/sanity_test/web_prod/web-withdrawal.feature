Feature: Withdrawal Modal

  Scenario: Member navigate to Withdrawal
    When member click Withdrawal at the profile option
    Then Withdrawal modal is shown

  Scenario: Member balance are shown at withdrawal modal header
    Given browser is at member withdrawal modal
    Then member balance exist at the withdrawal modal
  
  Scenario: Amount text field exist at withdrawal modal
    Given browser is at member withdrawal modal
    Then amount text box exist and enabled

  Scenario: Hexopay credit card exist at withdrawal modal
    Given browser is at member withdrawal modal
    Then hexopay card exist

  Scenario: Hexopay credit card exist at withdrawal modal
    Given browser is at member withdrawal modal
    Then Withdraw button exist and is disabled
  
  # Scenario: Withdraw button enabled
  #   Given browser is at member balance modal
  #   When user enter amount
  #   And checks Hexopay Credit card
  #   Then Withdrawal button will be enabled


 