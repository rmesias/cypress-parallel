@members
Feature: Members- Label Management

  Scenario Outline: Verify member can remove custom columns
    When admin clicks "Custom Columns" icon 
    And admin uncheck some "<column>" 
    And admin clicks "Apply" button
    Then admin should see unchecked specific "<column>" removed
      Examples:
      | column          |
      | No.	            |
      | Label name	    |
      | Number of people|	
      | Actions         |

  Scenario: Verify member can reset custom columns
    When admin clicks "Custom Columns" icon
    And admin clicks the "Reset" button 
    Then admin should see all checkboxes options will be checked

  Scenario: Creating Member label
    When admin clicks "Create new label" button
    And enters Label name "qatest", choosed color and Description
    And clicks Confirm button
    Then a confirmation message prompt "New label has created successfully."
    And new label is found a the top of the list

  Scenario: Cancel creating Member label
    When admin clicks "Create new label" button
    And enters Label name "qatest1", choosed color and Description
    And clicks "Cancel" button
    Then "Edit label" modal will be closed

  Scenario: Editing Member label name
    Given a member label "qatest" exist
    When user clicks Edit for the member label
    And change name to "newlabelName"
    And clicks Confirm button
    Then a confirmation message prompt "Label has updated successfully."
    And edited label is found a the top of the list
  
  Scenario: Search Member label
    Given a member label "qatest" exist
    When admin search member label name
    Then member label should be listed and alone in the page

  Scenario: Clear all search
    Given a member label "qatest" exist
    And admin search member label name
    When click "Clear all" filter
    Then no filter on label name

  Scenario: Save search and use quick filter
    Given a member label "qatest" exist
    When admin search member label name "qatest"
    And "Save Search" link is click
    And add name for save Search
    And "Save changes" button is click
    Then title can be seen on Quick Filter field

  Scenario: Modify search settings
    When settings icon is click
    And click Modify link
    Then Label Name will show
  
  Scenario: Click search settings and delete existing save search
    When settings icon is click
    And click "Delete" link
    Then "Search settings deleted" will show
  
  Scenario: Deleting member label
    Given a member label "qatest" exist
    When user clicks Delete for the member label
    Then a modal will show "Confirm Delete"
    And clicks confirm button
    And a confirmation message prompt "Member label deleted successfully."
    And member label "qatest" should no longer exist in the list

  Scenario: Click watchlist
    When click watchlist
    Then the "Watchlist" header will show
