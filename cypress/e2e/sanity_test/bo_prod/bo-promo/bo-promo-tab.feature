Feature: Promo tab

  Scenario Outline: Verify admin can click promo tab
    When admin click the "Promo" tab
    Then admin can see the "<menu-item>"
    Examples:
        | menu-item     |
        | Promo Listing |
        | Promo Requests|
        | Promo Labels  |