Feature: System Management - Rotating Banner

  Background: 
    Given admin is on the "Rotating Banner" tab

  Scenario: Verify can see different tabs under Rotating Banner
    Then "Banner Name" must be shown on the table
    And "Mobile/H5" must be shown on the table
    And "Desktop" must be shown on the table
    And "Action" must be shown on the table

  Scenario: Verify banner settings is visible and clickable
    When Banner Settings button is click
    Then "Banner Settings" modal will show
  
  Scenario: When New Alerts and Notifications button is click
    When "New Banner Upload" button is click
    Then the "New Banner Upload" modal will show