Feature: System Management - Category / Vendor Config (Portrait App)

  Background: 
    Given admin is on the "Category / Vendor Config (Portrait App)" tab

  Scenario: Verify can see different tabs under Category / Vendor Config (Portrait App)
    Then "Categories" must be shown on the table
    And "Vendors" must be shown on the table
    And "Actions" must be shown on the table

  Scenario: When New Category button is click
    When "New Category" button is click
    Then the "New Category" modal will show