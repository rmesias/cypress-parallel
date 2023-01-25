Feature: Deposits tab

  Scenario: Verify admin can click deposits tab
    When admin click the "Deposits" tab
    Then admin can see the "Deposit Requests(Internal)"
    And admin can see the "Deposit Requests (3rd Party)"
    And admin can see the "Payment Method Listing"
    And admin can see the "3rd Party Deposit Providers"