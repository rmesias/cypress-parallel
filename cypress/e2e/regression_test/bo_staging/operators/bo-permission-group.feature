Feature: Operators - Permission group

  Background: 
    Given browser is at Permission Group page

  Scenario: Verify admin can click custom columns icon
    When admin clicks "Custom Columns" icon 
    Then admin should be see draggable "Custom Columns" dropdown options
  
  Scenario Outline: Verify can remove custom columns
    When admin clicks "Custom Columns" icon 
    And admin uncheck some "<column>" 
    And admin clicks "Apply" button
    Then admin should see unchecked specific "<column>" removed
      Examples:
      | column            |
      | Date/Time updated |
      | Name              |
      | Permissions       |
      | Action            |

  Scenario: verify can reset custom columns
    When admin clicks "Custom Columns" icon
    And admin clicks the "Reset" button 
    Then admin should see all checkboxes options will be checked

  Scenario: Verify can close custom columns
    When admin clicks "Custom Columns" icon
    And admin clicks "Cancel" button 
    Then admin should see "Custom Column" modal closed

  Scenario: When download csv button is click
    When csv button is click
    Then download csv modal will show

  Scenario: Save search on permission group
    When click permission group and select first name
    And "Save Search" link is click
    And add name for save Search
    And "Save changes" button is click
    Then title can be seen on Quick Filter field

  Scenario: Admin clicks the selected permission group name
    When admin clicks permission group field
    And admin clicks the first name on dropdown
    Then admin should see info of that permission in list panel

  Scenario: Admin clicks the selected serial code
    When admin clicks serial code field
    And admin clicks the first name on dropdown
    Then admin should see info of that serial code in list panel

  Scenario: Verify Permission field can see dropdown menu
    When admin clicks permission field
    Then admin should see drop down options for that field

  Scenario: Verify that admin can create permission group
    When user clicks 'New permission group' button
    And checked all permission with name "qatest"
      |boards             |
      |Dashboard          |
      |Operators          |
      |Members            |
      |Affiliates         |
      |Deposit            |
      |Withrawals         |
      |Promo              |
      |VIP                |
      |Rebates            |
      |Reports            |
      |System Management  |
    And clicked Confirm
    Then A confirmation message is received "The permission group has been created successfully."
  
  Scenario: Verfiy that user can Update Permission Group
    When user updates permission leaving only dashboard
      |boards             |
      |Operators          |
      |Members            |
      |Affiliates         |
      |Deposit            |
      |Withrawals         |
      |Promo              |
      |VIP                |
      |Rebates            |
      |Reports            |
      |System Management  |
    And clicked save
    Then A confirmation message is received "The permission group has been updated successfully."

  Scenario: Admin selected the date time filter
    When admin clicks date time field
    And admin clicks start and end date
    Then admin should see list of date time filter on those date

  Scenario: Verify that user can Delete permission group
    When user clicks delete
    And clicks Confirms
    Then A confirmation message is received "Permission group deleted."