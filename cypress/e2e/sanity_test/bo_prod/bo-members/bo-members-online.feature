Feature: Members - Members Online

  Background: 
    Given admin is on the "Members Online" tab

  Scenario: Verify can see different tabs under Members Online
    Then "Username" must be shown on the table
    And "Real Name" must be shown on the table
    And "Affiliate" must be shown on the table
    And "Last Login" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then "Quick Filter" must be shown on the left side
    And "Username" must be shown on the left side below quick filter