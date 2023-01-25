Feature: Admin Signin

  Scenario: Admin input a wrong password
    When enters wrong username and password
    Then an error message will show "Invalid username or password"

  Scenario: Admin can signin to admin.nexuix.io
    When enters username "adminqa1" and password "password"
    And click "Signin" button
    Then admin will be redirected to "Dashboard"