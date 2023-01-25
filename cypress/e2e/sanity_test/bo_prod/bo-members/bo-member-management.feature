Feature: Members - Member Management

  Background: 
    Given admin is on the "Member Management" tab

  Scenario: Verify can see different tabs under Member management
    Then "Username" must be shown on the table
    And "First Name" must be shown on the table
    And "Last Name" must be shown on the table
    And "Real Name" must be shown on the table
    And "Affiliate" must be shown on the table
    And "VIP Tier" must be shown on the table
    And "Member Marker" must be shown on the table
    And "Account Balance" must be shown on the table
    And "Total Effective Bet" must be shown on the table
    And "Status" must be shown on the table
    And "Labels/Remarks" must be shown on the table
    And "Verification Status" must be shown on the table
    And "Country" must be shown on the table
    And "Country Code" must be shown on the table
    And "Post Code" must be shown on the table
    And "Last Login" must be shown on the table
    And "Brand ID" must be shown on the table
    And "Platform ID" must be shown on the table

  Scenario: Search row must be shown on the left side
    Then Quick Filter must be shown on the left side
    And "Username" must be shown on the left side
    And "Real Name" must be shown on the left side
    And "Last Login" must be shown on the left side
    And "VIP" must be shown on the left side
    And "Brand" must be shown on the left side
    And "Brand ID" must be shown on the left side
    And "Platform ID" must be shown on the left side
    And "Member Marker" must be shown on the left side
    And "Label" must be shown on the left side
    And "Post Code" must be shown on the left side
    And "Status" must be shown on the left side
    And "Verification Status" must be shown on the left side

  Scenario: When click Advanced filter on Search row
    When "Advanced Filter" is click on search row
    Then "Registration IP" from advanced filter must be shown on the left side
    And "Last Login IP" from advanced filter must be shown on the left side
    And "Birth date" from advanced filter must be shown on the left side
    And "Bank Account Number" from advanced filter must be shown on the left side
    And "Mobile Phone Number" from advanced filter must be shown on the left side
    And "Profile Validation" from advanced filter must be shown on the left side

  Scenario: When clicking new the information must be shown
    When "New" is click
    Then "Username" must be shown
    And "Real Name" must be shown
    And "First Name" must be shown
    And "Last Name" must be shown
    And "Member Marker" must be shown
    And "Primary VIP - Programme A" must be shown
    And "Birth date" must be shown
    And "Label" must be shown
    And "Deposit Limit" must be shown
    And "Password" must be shown
    And "Gender" must be shown
    And "Email" must be shown
    And "Mobile Phone" must be shown
    And "Country" must be shown
    And "Postal Code" must be shown
    And "Address" must be shown
    And "Address 2" must be shown
    And "City" must be shown
    And "User Communication Preference" must be shown

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

  Scenario: When hovering more actions menu items must be shown
    When admin hovers more actions button
    Then "Import Member" more actions item must be shown
    And "Edit Balance" more actions item must be shown
    And "Edit Promo Manual Adjustment" more actions item must be shown
    And "Edit Labels" more actions item must be shown
    And "Edit Status" more actions item must be shown
    And "Edit Profile Validation" more actions item must be shown
    And "Edit Member Marker" more actions item must be shown
    And "Force Login Password Change" more actions item must be shown
    And "Force Withdrawal Password Change" more actions item must be shown
    And "Edit VIP" more actions item must be shown
    And "Send Message" more actions item must be shown
    And "Download CSV" more actions item must be shown
