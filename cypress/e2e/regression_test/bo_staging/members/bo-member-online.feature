@members
Feature: Members- Members Online

Scenario: Verify can see table columns
    Then tab must be shown on the table
      | value           |
      | No.	            |
      | Username        |
      | Real Name	      |
      | Current Session Time |
      | Turnover        | 
      | GGR             |
      |	IP Address      |	
      | Channel         |
      | Affiliate       |
      | Last Login	    |
      | Account Balance	|
      | Lifetime GGR    |
      | Member Marker   |
      | Member label    |

Scenario: Verify can see lists on Custom Columns
  When click on custom column icon
  Then custom column list must be shown
      | value           |
      | No.	            |
      | Username        |
      | Real Name	      |
      | Current Session Time|
      | Turnover        | 
      | GGR             |
      |	IP Address      |	
      | Channel         |
      | Affiliate       |
      | Last Login	    |
      | Account Balance	|
      | Lifetime GGR    |
      | Member Marker   |
      | Member label    |

Scenario: Click watchlist
    When click watchlist
    Then the "Watchlist" header will show