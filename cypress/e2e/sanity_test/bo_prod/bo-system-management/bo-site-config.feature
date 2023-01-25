Feature: System Management - Site Configurations

  Background: 
    Given admin is on the "Site Configurations" tab

  Scenario: Verify can see different tabs under Site Configurations
    Then "Name" must be shown on the table
    And "Description / Remarks" must be shown on the table
    And "Status" must be shown on the table
    And "SSL" must be shown on the table
    And "Actions" must be shown on the table

  Scenario: Search row must be shown on the left side
    When left side button is click
    Then "Domain Name" must be shown on the left side
    And "SSL Certification" must be shown on the left side
    And "Status" must be shown on the left side

  Scenario: When New Domain is click
    When "New Domain" is click
    Then "New Domain" will show

  Scenario: When Edit button is click
    When "Edit" button is click
    Then the "Edit Site Configuration" modal will show