Feature: Rebates

  Background: 
    Given admin is on the "Rebates" tab

  Scenario: Verify can see table columns
    Then tab must be shown on the table
      | value                    |
      | ID                       |
      | Rebate Group Name (level)|	
      | To Do List	             |
      | Validity                 |
      | No. of Members	         |
      | Qualifying VIP	         |
      | Status                   |
      | Actions                  |
  
  Scenario: Add new rebate group
    When "Add new rebate group" is click
    And add group name vip and member Marker
    And click "Next" three times
    Then message prompt shows "Rebate group has been saved successfully."
    And "Confirm" button is click

  Scenario: Search rebate name
    When user enters rebate name
    Then rebate name is filtered in the rebate name list
  
  Scenario: Save search and use quick filter
    When user enters rebate name
    And "Save Search" link is click
    And add name for save Search
    And "Save changes" button is click
    Then title can be seen on Quick Filter field
  
  Scenario: Click search settings and delete existing save search
    When settings icon is click
    And click "Delete" link
    Then "Search Settings" will show
    And save search will be deleted "Search settings deleted"

  Scenario: Edit rebate group name to publish status
    When click "Edit" menu item
    And click "Next" three times
    Then message prompt shows "Rebate group has been updated successfully."
    And change status to Publish
    And "Confirm" button is click
    And Status is set to "Active"
  
  Scenario: click duplicate
    When click "Duplicate" menu item
    And "Confirm" button is click
    Then side message prompt shows "Rebate group duplicated."

  Scenario: click continue editing
    When "Continue editing" button is click
    And click "Next" three times
    And "Confirm" button is click
    Then message prompt shows "Rebate group has been published successfully."

  Scenario: delete duplicate rebate name
    When click "Delete" menu item
    And "Confirm" button is click
    Then side message prompt shows "Rebate group deleted."

  Scenario: deactivate rebate name
    When click "Deactivate" menu item
    Then side message prompt shows "Rebate group deactivated."
    And can now "Delete" the rebate name
  

