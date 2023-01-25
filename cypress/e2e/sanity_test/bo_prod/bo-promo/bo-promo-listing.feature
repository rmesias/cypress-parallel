Feature: Promo - Promo Listing

  Background:  
    Given admin is on the "Promo Listing" tab

  Scenario: Verify can see different tabs under Promo Listing
    Then "All" must be shown on the table
    And "Sign Up" must be shown on the table
    And "New Category" must be shown on the table

  Scenario: Verify can see modal when new promo button is click
    When "New Promo" is click
    Then "Promo Type" modal will show
    And "Sign up bonus" will show
    And "First/Deposit Promo" will show
    And "General Promo" will show