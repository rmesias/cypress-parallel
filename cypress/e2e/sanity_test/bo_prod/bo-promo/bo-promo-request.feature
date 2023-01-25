Feature: Promo - Promo Requests

  Background: 
    Given admin is on the "Promo Requests" tab

  Scenario: Verify can see different tabs under Promo Requests
    Then "Request ID" must be shown on the table
    And "Username" must be shown on the table
    And "Real Name" must be shown on the table
    And "VIP Tier" must be shown on the table
    And "Member Marker" must be shown on the table
    And "Promotion Name" must be shown on the table
    And "Promo Type" must be shown on the table
    And "Date/Time" must be shown on the table
    And "Status" must be shown on the table
    And "Operator" must be shown on the table
    And "Operator Remark" must be shown on the table
    And "IP Address" must be shown on the table
    And "IP Address Country" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then Quick Filter must be shown on the left side
    And "Request ID" must be shown on the left side
    And "Username" must be shown on the left side
    And "Member Marker" must be shown on the left side
    And "Date / Time Created" must be shown on the left side
    And "Promo Name" must be shown on the left side
    And "Status" must be shown on the left side
    And "Operator" must be shown on the left side