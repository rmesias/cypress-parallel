Feature: Betting history

  Scenario: Betting history modal exist
    When member click Betting history at the profile option
    Then Sports betting history modal is shown

  Scenario Outline: Member can view Sports betting history <daysView>
    Given browser is at member Sports Betting History modal
    And selects "<daysView>"
    Then sports Total bets should be shown
    And sports Total Profit and Loss should be shown
    Examples:
      |daysView     |
      |Last 24hrs   |
      |Last Week    |
      |Last Month   |
      |Last 3 Months|
      |Last Year    |
