Feature: Transaction history

  Scenario: Transaction history modal exist
    When member click Transaction history at the profile option
    Then transaction history modal is shown

  Scenario Outline: Member can view transaction history <daysView>
    Given browser is at member Transaction History modal
    And selects "<daysView>"
    Then Net Desposits should be shown
    Examples:
      |daysView     |
      |Last 24hrs   |
      |Last Week    |
      |Last Month   |
      |Last 3 Months|
      |Last Year    |