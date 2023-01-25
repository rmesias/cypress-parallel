Feature: System Management - Common Configurations

  Background: 
    Given admin is on the "Common Configurations" tab
  
  Scenario: Verify Manage currency modal will appear
    When "View/Select Default Currency" is click
    Then "View & Select your Default Currency" modal will appear

  Scenario: Verify Manual reality modal will appear
    When "Configure Reality Check Time" is click
    Then "Change Reality Check Time" modal will appear

  Scenario: Verify SMTP config modal will appear
    When "Configure SMTP" is click
    Then "Configure SMTP" modal will appear

  Scenario: Verify Manage country modal will appear
    When "View/Select Default Country" is click
    Then "View & Select Default Country" modal will appear
  
  Scenario: Verify email audit trail modal will appear
    When "View Logs - Email Transaction" is click
    Then "View Logs - Email Transaction" modal will appear
  
  Scenario: Verify Hexopay Shop Details modal will appear
    When "Configure Hexopay Shop Details" is click
    Then "Configure Hexopay Shop Details" modal will appear
  
  Scenario: Verify manage dynamic page modal will appear
    When "Configure Dynamic Pages" is click
    Then "Manage Dynamic Pages" modal will show
  
  Scenario: Verify manage country code modal will appear
    When "View/Select Default Country Code" is click
    Then "View & Select your Default Country Code" modal will appear
  
  Scenario: Verify manage email content will appear
    When "Configure Email Content" is click
    Then "Configure Email Content" modal will appear

  Scenario: Verify manage sign-up config will appear
    When "Sign Up Config" is click
    Then "Sign Up Config" modal will appear
  
  Scenario: Verify Manage GBG (User Verification) will appear
    When "Configure GBG Checks" is click
    Then "Manage" modal will appear
  
  Scenario: Verify Manage Neteller Shop Details will appear
    When "Configure Neteller Shop Details" is click
    Then "Configure Neteller Shop Details" modal will appear

  Scenario: Verify Manage Skrill Shop Details will appear
    When "Configure Skrill Shop Details" is click
    Then "Configure Skrill Shop Details" modal will appear

  Scenario: Verify View Loqate Audit Trail will appear
    When "View Logs - Loqate" is click
    Then "View Logs - Loqate" modal will appear

  Scenario: Verify View Reality Check Audit Trail will appear
    When "View Logs - Reality Check" is click
    Then "View Logs - Reality Check" modal will appear
  
  Scenario: Verify View Sign Up Config Audit Trail will appear
    When "View Logs - Sign Up Config" is click
    Then "View Logs - Sign Up Config" modal will appear

  Scenario: Verify View GBG Audit Trail will appear
    When "View Logs - GBG" is click
    Then "View Logs - GBG" modal will appear
  
  Scenario: Verify View GAMSTOP Audit Trail will appear
    When "View Logs - GAMSTOP" is click
    Then "View Logs - GAMSTOP" modal will appear