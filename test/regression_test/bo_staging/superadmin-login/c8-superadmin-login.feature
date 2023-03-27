Feature: Superadmin login

  Scenario: Superadmin can login
    Given admin is at "controlcenter/signin" page
    When admin enters username "superadmin"
    And enters password "password"
    And clicks "Login" button
    Then account management All client should exist
    And admin username exist at the top right corner of the page
    And access token exist
