Feature: System Management - Common Configurations

  Background: 
    Given admin is on the "Common Configurations" tab
  
  Scenario Outline: Verify Feature Toggles appear
    Then "<items>" exist
    Examples:
      |items              |
      |Check Fraud        |
      |Session Management |
      |Loqate Feature     |
      |Check Deposit Limit|
      |GAMSTOP            |