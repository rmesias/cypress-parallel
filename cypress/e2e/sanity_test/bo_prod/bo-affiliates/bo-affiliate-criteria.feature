@affiliates
Feature: Affiliates - Affiliate Criteria

  Background: 
    Given admin is on the "Affiliate Criteria" tab

  Scenario: Verify can see different tabs under affiliate criteria
    Then "Profile Setting" must be shown on the table
    And "Mandatory" must be shown on the table
    And "Optional" must be shown on the table
    And "Hidden" must be shown on the table

  Scenario: Affiliate Criteria consists of ..
    Then the profile setting must consists of "Real Name"
    And the profile setting must consists of "Gender"
    And the profile setting must consists of "Date of Birth"
    And the profile setting must consists of "Mobile Number"
    And the profile setting must consists of "Email"
    And the profile setting must consists of "Address"
    And the profile setting must consists of "Title"
    And the profile setting must consists of "Phone Number"