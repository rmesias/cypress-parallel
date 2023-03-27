Feature: Deposits Tab

Scenario: Verify can see different tabs under deposits
    When admin click the "Deposits" tab
    Then tab must be shown on the table
      | tab                         |
      | Deposit Requests(Internal)  |
      | Deposit Requests (3rd Party)|
      | Payment Method Listing      |
      | 3rd Party Deposit Providers |