Feature: System Management - Common Configurations

  Background: 
    Given admin is on the "Common Configurations" tab

 Scenario: Verify GBG Modal 
    When "Configure GBG Checks" is click
    And Enable Gbg button is click
    Then Admin click "OK" button 

Scenario: Admin enable the GBG Feature
   When "Configure GBG Checks" is click
   And Enable Gbg button is click
   Then Admin should be able to enable GBG by clicking "OK" button

Scenario: Admin sets the withdrawal amount
   When "Configure GBG Checks" is click
   And Admin clicks "If Withdrawal is greater than:"
   Then Admin clicks the "OK" button
 
Scenario: Admin disables the GBG feature
    When "Configure GBG Checks" is click
    And Admin turns off the GBG 
    Then Admin click "OK" button 

Scenario: Admin sets back the GBG feature default value to enabled
   When "Configure GBG Checks" is click
   And  Admin clicks "After Successful Sign Up"
   Then Admin clicks the "OK" button