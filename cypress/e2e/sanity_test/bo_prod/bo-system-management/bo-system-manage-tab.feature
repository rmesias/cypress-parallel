Feature: System Management tab

  Scenario Outline: Verify admin can click System Management tab
    When admin click the "System Management" tab
    Then admin can see the "<menu-item>"
    Examples:
        | menu-item                                 |
        | Site Configurations                       |
        | Alerts and Notifications                  |
        | Marquee Messages                          |
        | Rotating Banner                           |
        | Geo-Fencing                               |
        | Force Profile Validation                  |
        | Category / Vendor Config (Portrait App)   |
        | Category / Vendor Config (Desktop Website)|
        | Common Configurations                     |