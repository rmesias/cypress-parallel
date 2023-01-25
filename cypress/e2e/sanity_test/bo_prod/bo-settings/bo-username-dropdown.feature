Feature: Admin Settings

  Scenario: Admin can see settings
    When admin click the username beside the admin photo
    Then admin can see "Change Password" and "Logout" options