Feature: Reports - EU Reports
 

 Background: 
   Given admin is on the "EU Reports" tab
 

 Scenario: Admin selects a brand
    When Admin clicks the brand dropdown box
    Then Admin clicks the "testnexiux"

Scenario: Admin selects Report type
    When Admin clicks Report type dropdown box
    Then Admin should see dropdown options

#Scenario: Admin clicks the start Date
 #   Then Admin should see calendar

Scenario: Admin clicks the Generate button
    Then admin should be able to generate

Scenario: Admin clicks the Download button
    Then admin should be able to download