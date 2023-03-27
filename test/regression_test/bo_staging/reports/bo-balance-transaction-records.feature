Feature: Balance Transaction Records

  Scenario: Balance Transaction Records default view
    Given browser is at Balance Transaction Records
    Then transaction records is shown

  Scenario: Refresh records
    Given browser is at Balance Transaction Records
    When admin clicks refresh button
    Then transaction records is reloaded

  Scenario: Verify admin can click custom columns icon
    When admin clicks "Custom Columns" icon 
    Then admin should be see draggable "Custom Columns" dropdown options
  
  Scenario: When download csv button is click
    And Download CSV is click
    Then download csv modal will show
  
  Scenario: When select timezone is click
    When admin click "Select Timezone"
    Then the "Select Timezone" modal will show