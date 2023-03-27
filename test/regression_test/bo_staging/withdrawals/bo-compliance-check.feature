Feature: Withdrawal - Compliance Check

  Background: 
    Given admin is on the "Compliance Check" tab

  Scenario: Verify the content of compliance check
    Then "Automatic compliance check" is there
    And the status toggle button is "Enabled"
    And "Turnover Requirement" is there
    And the enable toggle button says "Yes"