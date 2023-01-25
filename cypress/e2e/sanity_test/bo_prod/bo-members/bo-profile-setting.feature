Feature: Members - Profile settings

  Background: 
    Given admin is on the "Profile Setting" tab
  
  Scenario: Verify can see different tabs under profile setting
    Then "Profile Setting" must be shown on the table
    And "Mandatory" must be shown on the table
    And "Optional" must be shown on the table
    And "Hidden" must be shown on the table
    And "Updatable" must be shown on the table
    And "Update Verification" must be shown on the table

  Scenario: Profile setting consists of ..
    Then the profile settings must consists of "Real Name"
    And the profile settings must consists of "Gender"
    And the profile settings must consists of "Date of Birth"
    And the profile settings must consists of "Mobile Number"
    And the profile settings must consists of "Email"
    And the profile settings must consists of "Address"
    And the profile settings must consists of "Title"
    And the profile settings must consists of "Phone Number"