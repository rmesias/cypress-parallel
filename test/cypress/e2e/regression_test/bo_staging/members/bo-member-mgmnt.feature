@members
Feature: Members - Member Management

  Background: 
    Given admin is on the "Member Management" tab

  Scenario: Member management - More actions
    When "More Actions" is click
    Then dropdown consist of
    | value |
    | Import Members  |
    | Edit Balance              |
    | Edit Promo Manual Adjustment  |
    | Edit Labels |
    | Edit Status |
    | Edit Profile Validation |
    | Edit Member Marker  |
    | Force Login Password Change |
    | Force Withdrawal Password Change |
    | Edit VIP  |
    | Send Message  |
    | Download CSV |

  Scenario: Import members on More actions
    When "More Actions" is click
    And "Import Members" is click
    Then admin can see the "Import Members" modal
    And "Download Template" button is clickable
    And "Upload Excel" is clickable

  Scenario: Edit Balance on More actions
    When "More Actions" is click
    And "Edit Balance" is click
    And enter member username
    And enter amount payout type
    And type "password"
    And save changes and click yes
    Then member account contains new balance

 Scenario: Verify admin can click custom columns icon
    When admin clicks custom columns icon 
    Then admin should see the draggable custom columns dropdown options


 


   