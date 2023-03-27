
Feature: Members- Profile Setting

  Scenario: Setting up all settings to hidden
    When user set all profile settings to "Hidden"
    And click Save button
    And confirm Save
    Then a confirmation message is recieved "Successfully Saved Changes"
    And all profile settings are in "Hidden"
  
  Scenario: Setting up all settings to mandatory
    When user set all profile settings to "Mandatory"
    And click Save button
    And confirm Save
    Then a confirmation message is recieved "Successfully Saved Changes"
    And all profile settings are in "Mandatory"

  Scenario: Setting up all settings to optional
    When user set all profile settings to "Optional"
    And click Save button
    And confirm Save
    Then a confirmation message is recieved "Successfully Saved Changes"
    And all profile settings are in "Optional"

  Scenario: Setting up all settings to updatable
    When user set all profile settings to "Updatable"
    And click Save button
    And confirm Save
    Then a confirmation message is recieved "Successfully Saved Changes"
    And all profile settings are in "Updatable"

  Scenario: Setting up all settings to update verification
    When user set all profile settings to "Updatable"
    And user set all profile settings to "Update Verification"
    And click Save button
    And confirm Save
    Then a confirmation message is recieved "Successfully Saved Changes"
    And all profile settings are in "Update Verification"