Feature: Promo Payout Records

  Scenario: Promo Payout Records default view
    Given browser is at Promo Payout Records
    Then payout records is shown

  Scenario: Refresh Promo Payout Records
    Given browser is at Promo Payout Records
    When admin clicks refresh button
    Then payout records is reloaded
  