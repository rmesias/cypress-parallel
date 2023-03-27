Feature: Back Office withdrawals

  Scenario: Admin view all members withdrawal request transaction
    Given browser is at Withdrawal request
    Then table of users for withdrawal request are shown

  Scenario Outline: Admin view <totalValue>
    Given browser is at Withdrawal request
    Then "<totalValue>" should be shown in the buttom portion of the table
    Examples:
      |totalValue|
      |Total Withdrawal Requested|
      |Total Withdrawal Processed|
      |Total Withdrawal Approved |

  # Scenario: Approving withdrawal request
  #   Given browser is at Withdrawal request
  #   When user Approved a member
  #   Then a confirmation message "Withdrawal request approved" prompts
  #   # And the selected member request should be gone in the withdrawal request list

  # Scenario: Rejecting withdrawal request
  #   Given browser is at Withdrawal request
  #   When user Reject a member
  #   And enter remarks as "Invalid request"
  #   Then a confirmation message "Withdrawal request rejected" prompts
  #   # And the selected member request should be gone in the withdrawal request list

  Scenario Outline: Withdrawal <method> method 
    Given browser is at Withdrawal Method listing
    Then a "<method>" withdrawal method exist
    Examples:
        |method |
        |Copy of Hexopay|
        |Manual Adjustment|

  Scenario: Withdrawal Manual Adjustment action is disabled
    Given browser is at Withdrawal Method listing
    Then action options for Manual Adjustment should be in disabled status
  
  Scenario: Add withdrawal method error validation
    Given browser is at Withdrawal Method listing
    When button "Add New Withdrawal Method" is click
    And clicks "Confirm" button
    Then fields below shows error 'Required' message:
      |fields|
      |name |
      |bankSelect|
      |accountNumber|
      |accountName|

  