Feature: System Management - Sign Up Config

  Background: 
    Given admin is on the "Common Configurations" tab

 Scenario: Verify Sign Up Config modal
    When "Sign Up Config" is click
    Then Admin click "OK" button 

Scenario: Admin enable Sign Up Config buttons
    When "Sign Up Config" is click
    And Admin clicks Sign Up Config buttons
    Then Admin click "OK" button 

Scenario: Admin enable default Sign in Config status
  When "Sign Up Config" is click
  And Admin enable Interim Safe Gambling Page button
  And Admin enable User Country Code Auto Detect button
  Then Admin click "OK" button 