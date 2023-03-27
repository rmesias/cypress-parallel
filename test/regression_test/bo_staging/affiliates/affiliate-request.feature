@affiliates
Feature: Affiliates- Affiliate Request

  Background: 
    Given admin is on the "Affiliate Request" tab
  
  Scenario: Verify can see table columns
    Then tab must be shown on the table
      | value               |
      | Request ID	        |
      | Username            |
      | Real Name	          |
      | Affiliate Programme	|
      | Status              |
      | VIP                 |
      | Request date	      |
      | Processor           |
      | Time Processed      |

  Scenario: Verify admin can click custom columns icon
    When admin clicks "Custom Columns" icon 
    Then admin should be see draggable "Custom Columns" dropdown options
  
  Scenario: When download csv button is click
    And Download CSV is click
    Then download csv modal will show
  
  