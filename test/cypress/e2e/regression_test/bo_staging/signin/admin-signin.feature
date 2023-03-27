Feature: Admin Sign-in

  Scenario: Make an XHR request for url
  Then status code should be 200

  Scenario: Verify that user can login at admin
    When user enters admin username
    And enters admin password
    And clicks "Signin" button
    Then user is redirected to admin "Dashboard"
  
  Scenario: Verify that user recieves error validation when incorrect admin login credentials is entered
    When user enters admin username "qatest"
    And enters admin password "qatest123"
    And clicks "Signin" button
    Then user recieves error message "Invalid username or password"

  