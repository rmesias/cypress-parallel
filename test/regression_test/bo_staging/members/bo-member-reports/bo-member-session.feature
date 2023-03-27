Feature: Member - Member Reports | Member Session Duration

  Background: 
    Given admin is on the "Member Session Duration" tab
  
  Scenario: Verify can see different tabs under Member Session Duration
    Then "Platform ID" must be shown on the table
    And "Brand ID" must be shown on the table
    And "Username" must be shown on the table
    And "Game Category" must be shown on the table
    And "Game Name" must be shown on the table
    And "Launch Stamp" must be shown on the table
    And "End Stamp" must be shown on the table
    And "Session Duration" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then "Username" must be shown on the left side
    And "Brand" must be shown on the left side
    And "Brand ID" must be shown on the left side
    And "Platform ID" must be shown on the left side