Feature: Reports- Daily Operating Report

  Scenario: Daily Operating report default view
    Given browser is at Daily report
    Then operating reports is shown

  Scenario: Refresh reports
    Given browser is at Daily report
    When admin clicks refresh button
    Then operating report is reloaded
  