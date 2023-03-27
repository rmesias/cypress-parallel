Feature: Admin change password

  Background: 
    Given change password form is shown

  Scenario: Admin enters incorrect current password
    When admin enters incorrect current password
    Then a confirmation pop-up message "Invalid Password" is shown
    And a warning message "Your current password is incorrect" is shown

  Scenario: New Password does no match
    When admin enters unmatch new password
    Then a warning message "New Password does not match" is shown
  
  Scenario: Password length validation
    When admin enters three characters for new password
    Then a warning message "Password Length must be between 6-36 characters" is shown
  
  Scenario: empty new password validation
    When admin leaves new passwords as empty
    Then a warning message "Required" is shown

  Scenario: New password is the same from old
    When admin enters password the same as the current
    Then a warning message "Current and New Password cannot be the same" is shown
  
    Scenario: Admin changing password
    When admin change password into "randomPass"
    Then a confirmation pop-up message "Successfully changed password" is shown
    And admin can no longer login with the old password
    And can login with the new password
