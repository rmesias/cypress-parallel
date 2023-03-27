Feature: Reports- Member Bet Records

  Background: 
    Given admin is on the "Member Bet Records" tab

  Scenario: Verify can see table columns
    Then tab must be shown on the table
      | value                   |
      | Serial Code	            |
      | Affiliates              |
      | Member                  |
      | Platform ID	            |
      | Vendor Bet ID	          |
      | Bet Amount	            |
      | Effective Bet Amount	  |
      | Win / Loss	            |
      | Status                  |
      | Win/Loss Status	        |
      | Game Vendor	            |
      | Game Title	            |
      | Game Category	          |
      | Game Sub Category	      |
      | Date / Time Placed      |
      | Date / Time Settled     |  
      | Date / Time Cancelled	  |
      | Session ID	            |
      | Tips                    |
      | Jackpot Contribution Bet|
      | Jackpot Win	            |
      | Cash Out Win/Loss	      |
      | Free Spin	              |
      | Device	                |
  
  Scenario: Verify admin can click custom columns icon
    When admin clicks "Custom Columns" icon 
    Then admin should be see draggable "Custom Columns" dropdown options
  
  Scenario: When download csv button is click
    And Download CSV is click
    Then download csv modal will show
  
  Scenario: When select timezone is click
    When admin click "Select Timezone"
    Then the "Select Timezone" modal will show