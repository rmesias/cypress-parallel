@members
Feature: Member footer

  # Scenario: Admin can see Account Balance Sum is updated
  #   When member deposit "10" for Account Balance
  #   Then total Account balance should be updated and incremented by 10

  Scenario Outline: Admin can see Footer <footerLabel>
    Given browser is at "Member Management" of euro wallet
    Then footer "<footerLabel>" in the footer is shown
      Examples:
        |footerLabel                |
        |Account Balance Sum (£)    |
        |Total Effective Bet Sum (£)|
        |Total Deposit Approved (£) |
        |Total Deposit Requested (£)|
