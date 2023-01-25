Feature: System Message - Manual Message

  Background: 
    Given admin is on the "Manual Message" tab

  Scenario: Verify can see different tabs under Manual Message
    Then "Title" must be shown on the table
    And "Created By" must be shown on the table
    And "Sending Date" must be shown on the table
    And "Read Messages" must be shown on the table
    And "Total Members" must be shown on the table

  Scenario Outline: Search row must be shown on the left side
    Then "Quick Filter" must also be shown on the left side
    And "Title" must be shown on the left side
    And "Created By" must be shown on the left side
    And "Sending Date" must be shown on the left side
    And "Target Members" must be shown on the left side
    And "Excluded Members" must be shown on the left side

  Scenario: When Create New Mail button is click
    When "Create New Mail" button is click
    Then the "Create New Mail" modal will show