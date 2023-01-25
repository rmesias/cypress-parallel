Feature: Reports - Promo Payout Records

 Background: 
   Given admin is on the "Promo Payout Records" tab

 
Scenario: When download csv button is click
    When csv button is click
    Then modal will show

Scenario: When Refresh icon is click
  Then Table will be refreshed

