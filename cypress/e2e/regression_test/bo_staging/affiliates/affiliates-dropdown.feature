Feature: Affiliates Tab

Scenario: Verify can see different tabs under affiliates
    When admin click the "Affiliates" tab
    Then tab must be shown on the table
      | tab                 |
      | Affiliate Programme |
      | Affiliate Criteria  |
      | Affiliate Request   |