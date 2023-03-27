Feature: Eu reports

  Scenario Outline: Generate EU reports <report>
    When user select "<report>" with A One Wallet Company brands
    And clicks Generate button
    Then A confirmation message "Report generated" is shown
    And Download button is enabled
      Examples:
      |report                          |
      |Daily Self-Exclusion Report     |
      |Daily Time-out Report           |
      |Newly Registered Members Report |
      |Daily Transaction Report        |
      |Daily Deposit Report            |
      |Full Customer Dumps             |
      |Deposit Limit Report            |
      |Daily Player Activities Report  |
      |Player Status Report            |

