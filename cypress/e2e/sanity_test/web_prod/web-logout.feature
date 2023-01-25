Feature: Member logout
Test logout and Verfiy page after logout

  Scenario: Member Logout exist account at profile settings
    When member clicks username at the header
    Then "Logout" should exist at users personnal options

  Scenario: Member Logout
    When member clicks username at the header
    And clicks "Logout"
    Then a confirmation message "Successfully Logged out" should exist
    And "Join" and "Login" button should exist
    And "End of Session" windows exist