Feature: Main Page Logos
Checked Web Main Page Logos if it exist and if it's clickable

  Scenario: Admin views betvision logo
    When Admin clicks betvision logo

  Scenario: Admin views twitter logo
    When Admin clicks twitter logo

  Scenario: Admin views mail logo
    When Admin clicks mail logo
    Then Admin should be routed to contact us page

  Scenario: Admin views helpcenter logo
      When Admin clicks helpcenter logo
      Then Admin should be routed to helpcenter page

  Scenario: Admin views gamstop logo
    When Admin clicks gamstop logo

  Scenario: Admin views begambleware logo
    When Admin clicks begambleware logo

  Scenario: Admin views Ibas logo
    When Admin clicks Ibas logo

   Scenario: Admin views Gambling Commission logo
    When Admin clicks Gambling Commission logo

   Scenario: Admin views GamCare logo
    When Admin clicks GamCare logo
  
  Scenario: Admin views Safe and Secure transaction logo
    When Admin clicks Safe and Secure transaction logo
    Then Admin should be routed to Safe and Secure transaction page

  Scenario: Admin views 18+ logo
    When Admin clicks 18+ logo
    Then Admin should be routed to Safer Gaming page
