Feature: Admin Dashboard total values tab

  #to verify admin can see dashboard
  Background: 
    Given admin is on the "Dashboard" tab

  Scenario Outline: Admin views dashboard tabs
    When admin clicks "<time>" tab
    Then admin should see "<bet>" tab
    And  admin should see "<deposit>" tab
    And  admin should see "<withdrawal>" tab
    And  admin should see "<wl>" tab
    And  admin should see "<net>" tab
    Examples:
          | time      | bet             | deposit             | withdrawal      | wl            | net             |
          | Today     | Total bet amount| Total deposit amount| Total withdrawal| Total win/loss| Total net profit| 
          | Yesterday | Total bet amount| Total deposit amount| Total withdrawal| Total win/loss| Total net profit| 
          | This Week | Total bet amount| Total deposit amount| Total withdrawal| Total win/loss| Total net profit| 
          | This Month| Total bet amount| Total deposit amount| Total withdrawal| Total win/loss| Total net profit| 
          | Last Month| Total bet amount| Total deposit amount| Total withdrawal| Total win/loss| Total net profit| 
          | Annual    | Total bet amount| Total deposit amount| Total withdrawal| Total win/loss| Total net profit| 
    
