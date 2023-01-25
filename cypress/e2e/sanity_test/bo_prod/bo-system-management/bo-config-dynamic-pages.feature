Feature: System Management - Configure Dynamic Pages

  Background: 
    Given admin is on the "Common Configurations" tab

 Scenario: Verify Configure Dynamic Pages modal 
    When "Configure Dynamic Pages" is click
    Then Admin click the "Close" button

Scenario: Admin checks the Terms and Conditions
    When "Configure Dynamic Pages" is click
    And Admin clicks "Terms and Conditions"
    And Admin clicks "Cancel" button

Scenario: Admin checks the Privacy Policy
    When "Configure Dynamic Pages" is click
    And Admin clicks "Privacy Policy"
    And Admin clicks "Cancel" button

Scenario: Admin checks the FAQ 
    When "Configure Dynamic Pages" is click
    And Admin clicks "FAQ"
    And Admin clicks "Cancel" button