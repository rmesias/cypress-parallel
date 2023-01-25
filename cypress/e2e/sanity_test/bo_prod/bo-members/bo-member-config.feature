Feature: Member - Member Management Config

  Background: 
    Given admin is on the "Member Management Config" tab
  
  Scenario: Verify can see different tabs under Member Management Config
    Then "Unique Email Adress" must be shown on the table
    And "YES" must be shown on the table
    And "NO" must be shown on the table
  
  Scenario: Verify unique address most contain
    Then "Same Email Address can be used in multiple accounts" contains
    And "How many accounts can use" contains

  Scenario: Verify can see different tabs under Member Management Config
    Then "Unique Mobile Number" must be shown on the table
    And "YES" must be shown on the table
    And "NO" must be shown on the table
  
  Scenario: Verify unique address most contain
    Then "Same Mobile Number can be used in multiple account registration?" contains
    And "How many accounts can use" contains