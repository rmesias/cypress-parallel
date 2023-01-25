Feature: Admin logged out his account

  Scenario: Admin can logout his account
    When user click the username beside the admin photo
    When user click the "Logout" button
    Then the user is redirected to sigin page