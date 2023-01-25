Feature: Promo - Promo Labels

  Background:  
    Given admin is on the "Promo Labels" tab

  Scenario: Verify can see different tabs under Promo Labels
    Then "Name" must be shown on the table
    And "Created By" must be shown on the table
    And "Colors" must be shown on the table
    And "Associated Promos" must be shown on the table
    And "Actions" must be shown on the table
    
  Scenario: Search row must be shown on the left side
    Then "Promo Label Name" must be shown on the left side
    And Quick Filter must be shown on the left side

  Scenario: When clicking create new promo label
    When "Create New Promo Label" is click
    Then "Create New Promo Label" modal will show