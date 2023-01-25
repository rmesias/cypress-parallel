Feature: Promo- Promo Requests

  Background: 
    Given admin is on the "Promo Requests" tab
  
  Scenario: Verify can see table columns
    Then tab must be shown on the table
      | value             |
      | Request ID	      |
      | Username          |
      | Real Name	        |
      | VIP Tier	        |
      | Member Marker	    |
      | Promotion Name	  |
      | Promo Type	      |
      | Date/Time	        |
      | Status            |
      | Operator	        |
      | Operator Remark	  |
      | IP Address	      |
      | IP Address Country|
  
  Scenario: Verify admin can click custom columns icon
    When admin clicks "Custom Columns" icon 
    Then admin should be see draggable "Custom Columns" dropdown options
  
  Scenario: When download csv button is click
    And Download CSV is click
    Then download csv modal will show
  