@members
Feature: Member Management Config

  Scenario: Set and save email as can be used in multiple registrations
    When admin set email to Yes for can be used in multiple registrations
    And reusability count set to 10
    Then a confirmation message "Successfully Saved Changes" is recieved

  Scenario: Set and save mobile number as can be used up multiple registrations
    When admin set mobile number to Yes for can be used in multiple registrations
    And reusability count set to 12
    Then a confirmation message "Successfully Saved Changes" is recieved