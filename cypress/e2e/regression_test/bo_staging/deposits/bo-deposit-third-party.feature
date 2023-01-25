Feature: Deposits- Deposit Request (3rd party)

  Background: 
    Given admin is on the "Deposit Requests (3rd Party)" tab
  
  Scenario: Verify can see table columns
    Then tab must be shown on the table
      | value                   |
      | Serial Code		          |
      | Affiliate               |
      | Account Username		    |
      | Affiliate   	          |
      | VIP Tier		            |
      | Member Marker	          |
      |   Payment Method	      |
      | Amount(£)	              |
      | Status                  |
      | Labels/Remarks	        |
      | Request Date / Time	    |
      | Processing Time	        |
      | Actions                 |

  Scenario: Verify admin can click custom columns icon
    When admin clicks "Custom Columns" icon 
    Then admin should be see draggable "Custom Columns" dropdown options
  
  Scenario: When download csv button is click
    And Download CSV is click
    Then download csv modal will show
  
  