Feature: Withdrawal - 3rd Party Withdrawal Providers

  Background: 
    Given admin is on the "3rd Party Withdrawal Providers" tab

  Scenario: Verify can see different tabs under 3rd Party Withdrawal Providers
    Then "Provider name" must be shown on the table
    And "Type" must be shown on the table
    And "API key preview" must be shown on the table
    And "3rd party payment gateway" must be shown on the table
    And "Date created" must be shown on the table
    And "Actions" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then "Quick Filter" must be shown on the left side
    And "Provider name" must be shown on the left side
    And "Type" must be shown on the left side
  
  Scenario: When Add New Withdrawal provider is click
    When "Add withdrawal provider" is click
    Then the "Add withdrawal provider" modal will show

  Scenario: Verify admin can click save search button
    When admin clicks save search button
    Then admin should see save search modal

  Scenario: Verify admin can click search settings icon
    When admin clicks search settings icon
    Then admin should see search settings icon

  Scenario: Verify admin can click custom columns icon
    When admin clicks custom columns icon 
    Then admin should see the draggable custom columns dropdown options
  
  Scenario: Verify admin can click download csv icon
    When admin clicks download csv icon
    Then download csv modal will show