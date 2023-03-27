Feature: Reports - Member Summary Report

  Background: 
    Given admin is on the "Member Summary Report" tab

  Scenario: Verify can see different tabs under Member Summary Report
    Then "Start - End Date / Time" must be shown on the table
    And "Game Category" must be shown on the table
    And "Game vendor" must be shown on the table
    And "Timezone Selection" must be shown on the table
    And "Created By" must be shown on the table
    And "Date/Time Created" must be shown on the table
    And "Date/Time Generated" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then "Quick Filter" must be shown on the left side
    And "Start - End Date / Time" must be shown on the left side
    And "Members" must be shown on the left side
    And "Game Category" must be shown on the left side
    And "Game vendor" must be shown on the left side
    And "Timezone Selection" must be shown on the left side
    And "Affiliate Flag" must be shown on the left side
    And "Affiliate Upline" must be shown on the left side
    And "VIP Level" must be shown on the left side
    And "Member Marker" must be shown on the left side
    And "Member Label" must be shown on the left side
    And "Registration Start - End Date / Time" must be shown on the left side
    And "Last Login Start - End Date / Time" must be shown on the left side
    And "Date of Birth Start - End Date / Time" must be shown on the left side
    And "Status" must be shown on the left side
    And "Account Balance" must be shown on the left side

  Scenario: Verify Generate button should be seen
    Then "Generate" button should be seen below search panel
  
  # Scenario: When custom column button is click
  #   When custom column button is click
  #   Then "Custom Columns" will show

  Scenario: When download csv button is click
    When csv button is click
    Then modal will show