Feature: System Management - Alerts and Notifications

  Background: 
    Given admin is on the "Alerts and Notifications" tab

  Scenario: Verify can see different tabs under Alerts and Notifications
    Then "Title" must be shown on the table
    And "Message" must be shown on the table
    And "Priority Alert" must be shown on the table
    And "Date/Time" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then "Title" must be shown on the left side
    And "Message" must be shown on the left side
    And "Priority Alert" must be shown on the left side

  Scenario: When New Alerts and Notifications button is click
    When "New Alerts and Notifications" button is click
    Then the "New Alerts and Notification" modal will show