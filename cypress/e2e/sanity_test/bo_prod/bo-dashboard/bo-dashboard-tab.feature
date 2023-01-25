Feature: Admin Dashboard tab

  Background: 
    Given admin is on the "Dashboard" tab

  Scenario: Verify admin can see the different time expressions
    Then admin can see "Today"
    And admin can see "Yesterday"
    And admin can see "This Week"
    And admin can see "Last Week"
    And admin can see "This Month"
    And admin can see "Last Month"
    And admin can see "Annual"
  
  Scenario: Verify Start date and End date should be equal today
    Then "Start date" should be equal today
    And "End date" should be equal today