Feature: Reports - Daily Operating Report

 Background: 
   Given admin is on the "Daily Operating Report" tab

 Scenario: When select timezone is click
    When admin click " Select Timezone"
    Then the "Select Timezone" modal will show
 
Scenario: When download csv button is click
    When csv button is click
    Then modal will show

Scenario: When Refresh button is click
    Then table display will reload

Scenario: When Save Search is click
    Then Save Search modal will display