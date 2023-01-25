Feature: Game history

  Scenario: Game history modal exist
    When member click Game history at the profile option
    Then game history modal is shown

  Scenario Outline: Member can view Game history <daysView>
    Given browser is at member Game History modal
    And selects "<daysView>"
    Then Total bets should be shown
    And  Total Profit and Loss should be shown
    Examples:
      |daysView     |
      |Last 24hrs   |
      |Last Week    |
      |Last Month   |
      |Last 3 Months|
      |Last Year    |