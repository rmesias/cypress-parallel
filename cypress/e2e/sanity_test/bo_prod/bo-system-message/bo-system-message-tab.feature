Feature: System Message tab

  Scenario Outline: Verify admin can click System Message tab
    When admin click the "System Message" tab
    Then admin can see the "<menu-item>"
    Examples:
        | menu-item         |
        | Manual Message    |
        | Automated Message |