Feature: System Management - Marquee Messages

  Background: 
    Given admin is on the "Marquee Messages" tab

  Scenario: Verify can see different tabs under Marquee Messages
    Then "Title" must be shown on the table
    And "Body" must be shown on the table
    And "Snippet" must be shown on the table
    And "Status" must be shown on the table
    And "Action" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then "Title" must be shown on the left side
    And "Body" must be shown on the left side
    And "Snippet" must be shown on the left side
    And "Status" must be shown on the left side
  
  Scenario: When New Alerts and Notifications button is click
    When "New Marquee Message" button is click
    Then the "New Marquee Message" modal will show