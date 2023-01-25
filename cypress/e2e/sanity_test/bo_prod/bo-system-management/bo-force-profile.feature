Feature: System Management - Force Profile Validation
  
  Background: 
    Given admin is on the "Force Profile Validation" tab
  
  Scenario: Verify Force Profile Validation tab is shown
    Then "Force Profile Validation" tab is shown

  Scenario: Verify can see different tabs under Rotating Banner
    Then "Field Name" must be shown on the table
    And "Member Validate" must be shown on the table
    And "Others" must be shown on the table

  Scenario: Verify Field name contains
    Then "Real Name" contains
    And "Gender" contains
    And "Date of Birth" contains
    And "Bank Account" contains

  Scenario: Verify Contact Information Update contains
    Then "Update Mobile Number" contains
    And "Update Email" contains