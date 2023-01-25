Feature: Members - Member Interaction Logs Report

  Background: 
    Given admin is on the "Member Interaction Logs Report" tab
  
  Scenario: Verify Search User can be seen when
    Then the "Search User" button can be seen
  
  Scenario: When user click the search user button
    When user click the "Search User" button
    Then the "Member Interaction Log" modal will be seen
    And "Enter Username" on the text field