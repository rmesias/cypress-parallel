Feature: Member - Member Reports | Member Access Audit history

  Scenario: Verify can see different tabs under Member Access audit history
    Then "Username" must be shown on the table
    And "Real Name" must be shown on the table
    And "Affiliate" must be shown on the table
    And "Account Balance" must be shown on the table
    And "Brand ID" must be shown on the table
    And "Platform ID" must be shown on the table
    And "Total Lifetime Effective Bet" must be shown on the table
    And "Labels/Remarks" must be shown on the table
    And "Member Marker" must be shown on the table
    And "VIP Level" must be shown on the table
    And "Registration Indicator" must be shown on the table
    And "Last login Date/Time" must be shown on the table
    And "Last Login Domain" must be shown on the table
    And "Last Login Ip Address" must be shown on the table
    And "Last Login Ip Address Location" must be shown on the table
    And "Last Login User Agent" must be shown on the table
    And "Last Login Device/OS Version" must be shown on the table
    And "Last Login Device UDID/Unique Identifier" must be shown on the table
    And "Last Login Device Fingerprint" must be shown on the table
    And "Last Login Browser" must be shown on the table
    And "Last Login Channel" must be shown on the table
    And "Session Logout" must be shown on the table
  
  Scenario: Search row must be shown on the left side
    Then "Username" must be shown on the left side
    And "Real Name" must be shown on the left side
    And "Member Marker" must be shown on the left side
    And "Brand" must be shown on the left side
    And "Last Login Date Time Range" must be shown on the left side
    And "Ip Address" must be shown on the left side
    And Quick Filter must be shown on the left side
    And Registration must be shown above the ip address

  Scenario: When select timezone is click
    When admin click " Select Timezone"
    Then the "Select Timezone" modal will show

  Scenario: Verify admin can click save search button
    When admin clicks save search button
    Then admin should see save search modal

  Scenario: Verify admin can click search settings icon
    When admin clicks search settings icon
    Then admin should see search settings icon

  Scenario: Verify admin can click refresh icon
    When admin clicks refresh icon 
    Then table should be refreshed

  Scenario: Verify admin can click custom columns icon
    When admin clicks custom columns icon 
    Then admin should see the draggable custom columns dropdown options
  
  Scenario: Verify admin can click download csv icon
    When admin clicks download csv icon
    Then download csv modal will show