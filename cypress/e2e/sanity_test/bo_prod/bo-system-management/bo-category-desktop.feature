Feature: System Management - Category / Vendor Config (Desktop Website)

  Background: 
    Given admin is on the "Category / Vendor Config (Desktop Website)" tab

  Scenario: Verify can see different tabs under Category / Vendor Config (Desktop Website)
    Then "Categories" must be shown on the table
    And "Vendors" must be shown on the table
    And "Actions" must be shown on the table
    
  Scenario: When New Category button is click
    When "New Category" button is click
    Then the "New Category" modal will show