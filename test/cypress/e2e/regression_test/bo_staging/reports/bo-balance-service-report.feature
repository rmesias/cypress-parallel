Feature: Reports - Balance Service Record Report

  Background: 
    Given admin is on the "Balance Service Record Report" tab

  Scenario: Verify Search User can be seen when
    Then the "Search User" button can be seen
  
  Scenario: When user click the search user button
    When user click the "Search User" button
    Then the "Balance Service Report" modal will be seen
    And "Enter Username" on the text field