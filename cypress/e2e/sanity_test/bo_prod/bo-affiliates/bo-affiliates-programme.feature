Feature: Affiliates - Affiliate Programme

  Background: 
    Given admin is on the "Affiliate Programme" tab

  Scenario: Verify can see different tabs under Affiliate Programme
    Then "ID" must be shown on the table
    And "Programme Name" must be shown on the table
    And "To Do" must be shown on the table
    And "Status" must be shown on the table
    And "Tiers" must be shown on the table
    And "Default Programme" must be shown on the table
    And "Negative Carry" must be shown on the table
    And "Members" must be shown on the table
    And "Actions" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then Quick Filter must be shown on the left side
    And "Programme Name" must be shown on the left side
    And "Status" must be shown on the left side
    And "Default Programme" must be shown on the left side
    And "Negative Carry" must be shown on the left side

  Scenario: contents when clicking create programme
    When "Create Programme" is click
    Then the "Agent Affiliate Programme" should be seen
    And the "Cost Settings" should be seen
    And the "Settlement Period" should be seen
    And the "Tier Settings" should be seen

  Scenario: Verify admin can click save search button
    When admin clicks save search button
    Then admin should see save search modal

  Scenario: Verify admin can click search settings icon
    When admin clicks search settings icon
    Then admin should see search settings icon

  Scenario: Verify admin can click refresh icon
    When admin clicks refresh icon 
    Then table should be refreshed