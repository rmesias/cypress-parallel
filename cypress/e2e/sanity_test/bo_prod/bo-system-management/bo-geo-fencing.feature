Feature: System Management - Geo Fencing
  
  Background: 
    Given admin is on the "Geo-Fencing" tab

  Scenario: Verify Geo fencing tab is shown
    Then "Geo-Fencing" tab is shown
  
  Scenario: When Edit button is click
    When "Edit" button is click
    Then "Set Up Geo-fencing Type" modal will show
  
  Scenario: Add more button is clickable
    When "Add More" button is click
    Then Geo location form will be added