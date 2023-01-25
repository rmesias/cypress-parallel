Feature: WEB RTP

  Scenario: RTP at the header
    Then RTP exist at landing page header

  Scenario: RTP at Footer
    Then RTP exist at footer 

  Scenario: Navigate to RTP from header cta
    When member click RTP
    Then member is redirected to RTP page

  Scenario: Navigate to RTP from Footer cta
    When member clicks RTP cta at footer
    Then member is redirected to RTP page
