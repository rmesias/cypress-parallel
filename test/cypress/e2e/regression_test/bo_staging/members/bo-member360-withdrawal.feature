@members
Feature: Withdrawal - Withdrawal Requests

Background: 
    Given admin is on the "Withdrawal Requests" tab

  Scenario: Admin view all members withdrawal request transaction
    When table for withdrawal request is shown
    Then "auto1019" should not be visible since Remove Balance transaction did not go through