Feature: Reports- Rebate Reports

  Background: 
    Given admin is on the "Rebates Reports" tab

  Scenario: Verify can see table columns
    Then tab must be shown on the table
      | value    |
      | Date/Time Created |
      | Rebate Programme Name |
      | Payout Time Set	  |
      | Settlement Method	|
      | Qualifying VIP Level	 |
      | Rebate Programme Period	  |
      | Total Number of Participating Member  |	
      | Total Number of Qualifying Members	|
      | Auto Payout	  |
      | Total Amount Payout	  |
      | Total Amount to be Payout	  |
      | Total Number of User Claimed	|
      | Total Amount Claimed	|
      | Amount Expired  |	
      | Clawback  |

  Scenario: Verify admin can click custom columns icon
    When admin clicks "Custom Columns" icon 
    Then admin should be see draggable "Custom Columns" dropdown options
  
  Scenario: When download csv button is click
    And Download CSV is click
    Then download csv modal will show
