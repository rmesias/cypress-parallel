@members
Feature: Members - Member Management

Background: 
    Given admin is on the "Member Management" tab
    
Scenario: Remove Balance Withdrawal
    When admin click on username
    And member name will be shown on tab
    And will be redirected to member profile
    And Edit Balance is click
    And Remove Balance is click
    And enter amount payout type
    And select a card
    And type remark
    And type "password"
    And save changes and click yes
    Then admin should see error message "Insufficient Funds"

Scenario: Remove Balance Credit transfer
    When admin click on username
    And member name will be shown on tab
    And will be redirected to member profile
    And Edit Balance is click
    And Remove Balance is click
    And enter amount payout type
    And select a card
    And type remark
    And type "password"
    And save changes and click yes
    Then admin should see error message "Insufficient Funds"

Scenario: Remove Balance System Debit
    When admin click on username
    And member name will be shown on tab
    And will be redirected to member profile
    And Edit Balance is click
    And Remove Balance is click
    And enter amount payout type
    And select a card
    And type remark
    And type "password"
    And save changes and click yes
    Then admin should see error message "Insufficient Funds"


