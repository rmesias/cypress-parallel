Feature: Reports - Member Bet Records

  Background: 
    Given admin is on the "Member Bet Records" tab

  Scenario: verify can reset custom columns
    When admin clicks "Custom Columns" icon
    And admin clicks the "Reset" button 
    Then admin should see all checkboxes options will be checked

  Scenario: Verify can see different tabs under Member Bet Reports
    Then "Serial Code" must be shown at the first column of the table
    And "Balance Unit Serial Codes" must be shown on the table
    And "Affiliates" must be shown on the table
    And "Member" must be shown on the table
    And "Platform ID" must be shown on the table
    And "Vendor Bet ID" must be shown on the table
    And "Bet Amount" must be shown on the table
    And "Effective Bet Amount" must be shown on the table
    And "Win / Loss" must be shown on the table
    And "Status" must be shown on the table
    And "Win/Loss Status" must be shown on the table
    And "GGR" must be shown on the table
    And "Payout" must be shown on the table
    And "Game Vendor" must be shown on the table
    And "Game Title" must be shown on the table
    And "Game Category" must be shown on the table
    And "Game Sub Category" must be shown on the table
    And "Date / Time Placed" must be shown on the table
    And "Date / Time Settled" must be shown on the table
    And "Date / Time Cancelled" must be shown on the table
    And "Session ID" must be shown on the table
    And "Tips" must be shown on the table
    And "Jackpot Contribution Bet" must be shown on the table
    And "Jackpot Win" must be shown on the table
    And "Cash Out Win/Loss" must be shown on the table
    And "Free Spin" must be shown on the table
    And "Device" must be shown on the table
    
  Scenario: Search row must be shown on the left side
    Then "Quick Filter" must be shown on the left side
    And "Serial Code" must be shown on the left side
    And "Member" must be shown on the left side
    And "Payout Amount" must be shown on the left side
    And "Game Title" must be shown on the left side
    And "Game Category" must be shown on the left side
    And "Game Sub Category" must be shown on the left side
    And "Vendor" must be shown on the left side
    And "Vendor Bet ID" must be shown on the left side
    And "Game Name" must be shown on the left side
    And "Vendor Category" must be shown on the left side
    And "Vendor Sub Category" must be shown on the left side
    And "Brand" must be shown on the left side
    And "Brand ID" must be shown on the left side
    And "Platform ID" must be shown on the left side
    And "Game Type" must be shown on the left side
    And "Date / Time Placed" must be shown on the left side
    And "Date / Time Settled" must be shown on the left side
    And "Date / Time Cancelled" must be shown on the left side
    And "Status" must be shown on the left side
    And "Bet Amount" must be shown on the left side
    And "Effective Bet" must be shown on the left side
    And "Win / Loss" must be shown on the left side
    And "Balance Unit Serial Code" must be shown on the left side
    And "Session ID" must be shown on the left side
    And "Tips" must be shown on the left side
    And "Jackpot Contribution Bet" must be shown on the left side
    And "Jackpot Win" must be shown on the left side
    And "Cashout Win / Loss" must be shown on the left side
    And "Free Spin" must be shown on the left side
    And "Device" must be shown on the left side

  Scenario: When select timezone is click
    When admin click " Select Timezone"
    Then the "Select Timezone" modal will show