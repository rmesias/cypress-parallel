Feature: Member login

  Scenario: Member can login to wallet site page
    When member enters username "natalie" with password "password"
    And clicks "Login" button
    Then a confirmation message is recieved
    And member will be redirected to main dashboard where balance is visible
