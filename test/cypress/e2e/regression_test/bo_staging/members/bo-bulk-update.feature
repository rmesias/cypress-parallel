@members
Feature: Member - Bulk Update

  Background: 
    Given admin is on the "Bulk Update" tab
  
  Scenario: Verify can see Bulk Change Status 
    Then "Bulk Change Status" should be seen on the page
    And "Upload Text File" button is present
    And toggle switch brand is also there