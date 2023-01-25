Feature: User login

  Scenario: Verify that user can login to wallet site page
    When user enters username "resttest" with password "password"
    And clicks "Login" button
    Then a confirmation message is recieved
    And user will be redirected to main dashboard where balance is visible
