Feature: System Management - Configure Reality Check Time

  Background: 
    Given admin is on the "Common Configurations" tab

 Scenario: Verify Reality Check Time modal 
    When "Configure Reality Check Time" is click
    Then Admin should be able to see the Reality Check Time modal
 
Scenario: Admin clicks the 15 minutes button
   When "Configure Reality Check Time" is click
   And Admin clicks the 15 minutes button
   Then Admin should be able to see the Reality Check Time modal

 Scenario: Admin clicks the 45 minutes button
   When "Configure Reality Check Time" is click
   And Admin clicks the 45 minutes button
   Then Admin should be able to see the Reality Check Time modal

Scenario: Admin clicks the 60 minutes button
   When "Configure Reality Check Time" is click
   And Admin clicks the 60 minutes button
   Then Admin should be able to see the Reality Check Time modal

Scenario: Admin clicks the Off button
   When "Configure Reality Check Time" is click
   And Admin clicks turn off button
   Then Admin should be able to see the Reality Check Time modal