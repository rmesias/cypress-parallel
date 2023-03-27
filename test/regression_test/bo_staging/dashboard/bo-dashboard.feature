Feature: Admin Dashboard

  Background: 
    Given admin is on the "Dashboard" tab

  Scenario: Verify can view the screen dashboard screen
    When user is logged to BO dashboard
    Then dashboard screen is displayed

  Scenario: Verify admin is on the dashboard tab
    Then tab block should contains "Dashboard"
  
  Scenario Outline: Verify admin can see graph depending on what time expression is clicked
    When "<time>" is clicked
    Then can view time expression graphs
      Examples:
        | time      |
        | Today     |
        | Yesterday |
        | This Week |
        | Last Week |
        | This Month|
        | Last Month|
        | Annual    |

  Scenario: Verify admin can click and choose the start and end date
    When admin clicks the calendar icon
    Then can choose start and end date
    And can view time expression graphs

  Scenario Outline: Verify can click "<card>"
    When admin click "<card>"
    Then "<card>" graph will shown
      Examples:
        | card                |
        | Total bet amount    |
        | Total deposit amount|
        | Total withdrawal    |
        | Total win/loss      |
        | Total net profit    |