Feature: Withdrawals- 3rd party Withdrawal providers

  Background: 
    Given admin is on the "3rd Party Withdrawal Providers" tab
  
  Scenario: Verify can see table columns
    Then tab must be shown on the table
      | value                     |
      | Provider name             |
      | Type                      |
      | API key preview	          |
      | 3rd party payment gateway	|
      | Date created	            |
      | Actions                   |
  
  Scenario: When download csv button is click
    And Download CSV is click
    Then download csv modal will show

  Scenario: When Add withdrawal provider is click
    When "Add withdrawal provider" is click
    Then "Add withdrawal provider" modal will show 