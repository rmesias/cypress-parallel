Feature: Inbox and messages formats
This case are to check whether inbox exist at the header once login and mesage are in correct formats

  Scenario: Inbox exist at the header
    Then "Inbox" should exist at the header

  Scenario: Member messages
    When member clicks "Inbox"
    Then message modal is shown
    And message title and is displayed

  Scenario: Message formats
    When member clicks "Inbox"
    And clicks top most message
    Then message content will be expanded
    And Trash bin icon for delete exist 